import { getAllArticles, getAllItems, getAllSubItems } from '@/utils/actions'
import { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, subItems, articles] = await Promise.all([
    getAllItems(),
    getAllSubItems(),
    getAllArticles(),
  ])

  const baseUrl = 'https://geology-stone.vercel.app'
  const now = new Date().toISOString()

  const formatUrl = (
    path: string,
    id: string | null | undefined,
    parentId?: string | null | undefined,
    priority = 0.8,
  ) => {
    if (!id) return null
    return {
      url: `${baseUrl}/${path}/${id}${parentId ? `/${parentId}` : ''}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority,
    }
  }

  const dynamicUrls: MetadataRoute.Sitemap = [
    ...items.map((i) => formatUrl('explore', i.slug)),
    ...subItems.map((s) => formatUrl('explore', s.item.slug, s.slug)),
    ...articles.map((a) => formatUrl('blog', a.slug)),
  ].filter((item): item is NonNullable<typeof item> => item !== null)

  const staticPages = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/explore',
    '/real-time-data',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.9,
  }))

  return [...staticPages, ...dynamicUrls]
}

export async function getAllUrls(): Promise<string[]> {
  const sitemap = await Sitemap()
  return sitemap.map((item) => item.url)
}
