'use server'

import prisma from '@/prisma/script'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { jwtVerify, SignJWT } from 'jose'
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function createFirstAdmin() {
  const isAlreadyAdmin = await prisma.admin.findFirst()

  if (isAlreadyAdmin) {
    throw new Error('Admin ALready exists.')
  }
  const hashedPassword = await bcrypt.hash('Password@123', 10)

  const admin = await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@geology.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  return admin
}

export const updateAdmin = async (formData: FormData) => {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const pass = formData.get('password') as string
  const updatePassword = formData.get('updatePassword') === 'on'

  if (!name || !email) {
    redirect('/control/profile?error=missing-fields')
  }

  if (updatePassword) {
    if (!pass || pass.length < 6) {
      redirect('/control/profile?error=password-short')
    }
  }

  if (updatePassword) {
    if (!pass || pass.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    const hashedPassword = await bcrypt.hash(pass, 10)

    await prisma.admin.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    revalidatePath('/control/profile?success=true')
    redirect('/control/profile?success=true')
  }

  await prisma.admin.update({
    where: { id },
    data: {
      name,
      email,
    },
  })
  revalidatePath('/control/profile?success=true')
  redirect('/control/profile?success=true')
}

export const login = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return redirect(
      '/control/login?error=' +
        encodeURIComponent('Email and password are required.'),
    )
  }

  if (typeof email !== 'string' || !email.trim()) {
    return redirect(
      '/control/login?error=' + encodeURIComponent('Invalid email format.'),
    )
  }

  if (typeof password !== 'string' || !password.trim()) {
    return redirect(
      '/control/login?error=' + encodeURIComponent('Invalid password format.'),
    )
  }

  const user = await prisma.admin.findUnique({ where: { email } })

  if (!user) {
    return redirect(
      '/control/login?error=' + encodeURIComponent('User not found.'),
    )
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return redirect(
      '/control/login?error=' + encodeURIComponent('Invalid credentials.'),
    )
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret)

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  cookies().set('role', user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  redirect('/control')
}

export const getAdmin = async (token: string) => {
  if (!token || !process.env.JWT_SECRET) return null

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    )

    const userId = payload.id as string

    return await prisma.admin.findUnique({
      where: { id: userId },
    })
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

export const logout = async () => {
  cookies().delete('token')
  cookies().delete('role')
  redirect('/control/login?error=unauthenticated')
}

export const createComment = async (formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required')
  }

  await prisma.contact.create({
    data: {
      name,
      email,
      message,
    },
  })

  redirect('/contact?success=true')
}

export const getAllComments = async () => {
  return await prisma.contact.findMany({})
}

export const deleteComment = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.contact.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/contact')
  redirect('/control/contact?success=true')
}

export const createReview = async (formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const content = formData.get('content') as string
  const rating = parseInt(formData.get('rating') as string)
  const articleId = formData.get('articleId') as string

  const blog = await prisma.article.findFirst({
    where: {
      id: articleId,
    },
  })

  if (!blog) {
    throw new Error('Blog Not Found')
  }

  if (!name || !email || !content || !rating || !articleId) {
    throw new Error('Missing required fields')
  }

  await prisma.review.create({
    data: {
      name,
      email,
      content,
      rating,
      articleId,
    },
  })

  revalidatePath(`/blog/${blog.slug}?success=true`)
  redirect(`/blog/${blog.slug}?success=true`)
}

export const getAllReview = async () => {
  return await prisma.review.findMany({})
}

export const getArticleReview = async (id: string) => {
  return await prisma.review.findMany({
    where: {
      articleId: id,
    },
  })
}

export const deleteReview = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.review.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/reviews')
  redirect('/control/reviews?success=true')
}

export const getAverageSchemeReview = async (id: string) => {
  const result = await prisma.review.aggregate({
    where: {
      articleId: id,
    },
    _avg: {
      rating: true,
    },
  })

  return result._avg.rating ?? 0
}

export const createArticle = async (formData: FormData) => {
  const title = formData.get('title') as string
  const short_desc = formData.get('short_desc') as string
  const long_desc = formData.get('long_desc') as string
  const image = formData.get('image') as File
  const slug = formData.get('slug') as string
  const featured = formData.get('featured') === 'on'

  if (!title || !long_desc || !image || !slug || !short_desc) {
    throw new Error('All fields are required')
  }
  const imageBuffer = await image.arrayBuffer()
  const imageBuff = Buffer.from(imageBuffer)
  const imageResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'geology/articles',
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed'))
          }
          resolve(result)
        },
      )
      stream.end(imageBuff)
    },
  )
  await prisma.article.create({
    data: {
      title,
      long_desc,
      short_desc,
      slug,
      featured,
      image: imageResult.secure_url,
    },
  })
  redirect(`/control/articles/create?success=true`)
}

export const getAllArticles = async () => {
  return await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const getFeaturedArticles = async () => {
  return await prisma.article.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const deleteArticle = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.article.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/articles')
  redirect('/control/articles?success=true')
}

export const getSingleArticle = async (slug: string) => {
  return await prisma.article.findUnique({
    where: { slug },
  })
}
export const updateArticle = async (formData: FormData) => {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const short_desc = formData.get('short_desc') as string
  const long_desc = formData.get('long_desc') as string
  const slug = formData.get('slug') as string
  const featured = formData.get('featured') === 'on'
  const image = formData.get('image') as File | null

  const existingArticle = await prisma.article.findUnique({
    where: { id },
  })

  if (!existingArticle) throw new Error('Article not found')

  let imageUrl = existingArticle.image

  if (image && image.size > 0) {
    const imageBuffer = await image.arrayBuffer()
    const imageBuff = Buffer.from(imageBuffer)

    const imageResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'geology/articles',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error('Upload failed'))
            }
            resolve(result)
          },
        )
        stream.end(imageBuff)
      },
    )

    imageUrl = imageResult.secure_url
  }

  await prisma.article.update({
    where: { id },
    data: {
      title,
      long_desc,
      short_desc,
      slug,
      featured,
      image: imageUrl,
    },
  })

  revalidatePath(`/control/articles/${slug}`)
  redirect(`/control/articles/${slug}?success=true`)
}

export const createCategory = async (formData: FormData) => {
  const title = formData.get('title') as string
  const long_desc = formData.get('long_desc') as string
  const featured = formData.get('featured') === 'on'

  if (!title || !long_desc) {
    throw new Error('All fields are required')
  }

  await prisma.category.create({
    data: {
      title,
      long_desc,
      featured,
    },
  })

  revalidatePath('/control/categories/create')
  redirect('/control/categories/create?success=true')
}

export const updateCategory = async (formData: FormData) => {
  const title = formData.get('title') as string
  const long_desc = formData.get('long_desc') as string
  const featured = formData.get('featured') === 'on'
  const id = formData.get('id') as string
  const display_order = formData.get('display_order')

  const order = typeof display_order === 'string' ? Number(display_order) : 0

  if (!title) {
    throw new Error('Title is required')
  }

  await prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
      long_desc,
      featured,
      display_order: order,
    },
  })

  revalidatePath(`/control/categories/${id}`)
  redirect(`/control/categories/${id}?success=true`)
}

export const getSingleCategory = async (id: string) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  })
}

export const getALlCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      display_order: 'desc',
    },
    include: {
      items: true,
    },
  })
}

export const getAllItems = async () => {
  return await prisma.item.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
  })
}

export const getItem = async (id: string) => {
  if (!id) {
    throw new Error('Slug is required to fetch an item')
  }

  return await prisma.item.findUnique({
    where: { slug: id },
    include: { category: true, subItem: true },
  })
}

export const deleteItem = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.item.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/categories/items')
  redirect('/control/categories/items?success=true')
}

export const deleteCategory = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.category.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/categories')
  redirect('/control/categories?success=true')
}

export const createItem = async (formData: FormData) => {
  const title = formData.get('title') as string
  const short_desc = formData.get('short_desc') as string
  const long_desc = formData.get('long_desc') as string
  const image = formData.get('image') as File
  const slug = formData.get('slug') as string
  const categoryId = formData.get('categoryId') as string

  if (!title || !image || !slug || !categoryId) {
    throw new Error('All fields are required')
  }
  const imageBuffer = await image.arrayBuffer()
  const imageBuff = Buffer.from(imageBuffer)
  const imageResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'geology/items',
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed'))
          }
          resolve(result)
        },
      )
      stream.end(imageBuff)
    },
  )
  await prisma.item.create({
    data: {
      title,
      long_desc,
      short_desc,
      slug,
      category: {
        connect: {
          id: categoryId,
        },
      },
      image: imageResult.secure_url,
    },
  })
  redirect(`/control/categories/items/create?success=true`)
}

export const updateItem = async (formData: FormData) => {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const short_desc = formData.get('short_desc') as string
  const long_desc = formData.get('long_desc') as string
  const image = formData.get('image') as File | null
  const slug = formData.get('slug') as string
  const categoryId = formData.get('categoryId') as string

  const existingItem = await prisma.item.findUnique({
    where: { id },
  })

  if (!existingItem) throw new Error('Article not found')

  let imageUrl = existingItem.image

  if (image && image.size > 0) {
    const imageBuffer = await image.arrayBuffer()
    const imageBuff = Buffer.from(imageBuffer)

    const imageResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'geology/items',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error('Upload failed'))
            }
            resolve(result)
          },
        )
        stream.end(imageBuff)
      },
    )

    imageUrl = imageResult.secure_url
  }

  await prisma.item.update({
    where: { id },
    data: {
      title,
      long_desc,
      short_desc,
      slug,
      category: {
        connect: {
          id: categoryId,
        },
      },
      image: imageUrl,
    },
  })

  revalidatePath(`/control/categories/items/${slug}`)
  redirect(`/control/categories/items/${slug}?success=true`)
}

type EarthquakeFeature = {
  id: string
  properties: {
    mag: number
    place: string
    time: number
  }
}

export const getEarthQuakes = async () => {
  const response = await fetch(
    'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=6&orderby=time',
    { cache: 'no-store' },
  )
  const data: { features: EarthquakeFeature[] } = await response.json()

  return data.features.map((quake) => ({
    id: quake.id,
    magnitude: quake.properties.mag,
    location: quake.properties.place,
    time: quake.properties.time,
  }))
}

export const createSubItem = async (formData: FormData) => {
  const title = formData.get('title') as string
  const short_desc = formData.get('short_desc') as string
  const long_desc = formData.get('long_desc') as string
  const image = formData.get('image') as File
  const slug = formData.get('slug') as string
  const itemId = formData.get('itemId') as string

  if (!title || !image || !slug || !itemId) {
    throw new Error('All fields are required')
  }
  const imageBuffer = await image.arrayBuffer()
  const imageBuff = Buffer.from(imageBuffer)
  const imageResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'geology/items',
          resource_type: 'image',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload failed'))
          }
          resolve(result)
        },
      )
      stream.end(imageBuff)
    },
  )
  await prisma.subItem.create({
    data: {
      title,
      long_desc,
      short_desc,
      slug,
      item: {
        connect: {
          id: itemId,
        },
      },
      image: imageResult.secure_url,
    },
  })
  redirect(`/control/sub-items/create?success=true`)
}

export const getAllSubItems = async () => {
  return await prisma.subItem.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      item: true,
    },
  })
}

export const deleteSubItem = async (formData: FormData) => {
  const id = formData.get('id') as string | number

  await prisma.subItem.delete({
    where: {
      id: id as string,
    },
  })
  revalidatePath('/control/sub-items')
  redirect('/control/sub-items?success=true')
}

export const getSubItem = async (id: string) => {
  if (!id) {
    throw new Error('Slug is required to fetch an item')
  }

  return await prisma.subItem.findUnique({
    where: { slug: id },
    include: { item: true },
  })
}
