import SuccessToast from '@/components/SuccessToast'
import { getAdmin, updateAdmin } from '@/utils/actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
  searchParams?: {
    error?: string
    success?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const success = searchParams?.success
  const error = searchParams?.error
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/login')
  }

  const admin = await getAdmin(token)

  if (!admin) {
    redirect('/login')
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-6'>
      <div className='w-full max-w-3xl'>
        <div className='bg-[#0f0f0f] border border-[#1f1f1f] rounded-xl p-10 shadow-[0_0_20px_rgba(34,197,94,0.08)]'>
          <div className='mb-10 text-center'>
            <h2 className='text-3xl font-bold text-white tracking-wide'>
              Update Profile
            </h2>
            <p className='text-sm text-gray-400 mt-2'>
              Update your account information
            </p>
            <div className='w-16 h-[2px] bg-green-400 mx-auto mt-4 opacity-70' />

            {success && (
              <SuccessToast
                text='Updated Successfully'
                url='/control/profile'
              />
            )}

            {error && (
              <div className='my-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 shadow-md'>
                <div className='flex items-start gap-3'>
                  <div className='flex-1'>
                    <h4 className='text-red-400 font-semibold text-sm'>
                      Update Failed
                    </h4>
                    <p className='text-red-300 text-sm mt-1'>
                      {error === 'password-short' &&
                        'Password must be at least 6 characters.'}
                      {error === 'missing-fields' &&
                        'Name and Email are required.'}
                      {error === 'invalid-email' &&
                        'Please enter a valid email address.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className='space-y-7' action={updateAdmin}>
            <input type='hidden' name='id' value={admin.id} />

            <div>
              <label className='block text-sm text-gray-400 mb-2'>Name</label>
              <input
                type='text'
                defaultValue={admin.name}
                name='name'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>Email</label>
              <input
                type='email'
                defaultValue={admin.email}
                name='email'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition'
              />
            </div>

            <div>
              <label className='block text-sm text-gray-400 mb-2'>
                New Password
              </label>
              <input
                type='password'
                name='password'
                placeholder='Enter new password'
                className='w-full bg-black border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition'
              />
            </div>

            <div className='form-control'>
              <label className='label cursor-pointer justify-start gap-4'>
                <input
                  type='checkbox'
                  name='updatePassword'
                  className='checkbox checkbox-primary'
                />
                <span className='label-text text-gray-400'>
                  Check to update password
                </span>
              </label>
            </div>

            <div className='flex justify-end pt-6'>
              <button
                type='submit'
                className='px-6 py-2 rounded-md bg-green-500/90 text-black font-semibold hover:bg-green-400 transition shadow-[0_0_12px_rgba(34,197,94,0.25)]'
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
