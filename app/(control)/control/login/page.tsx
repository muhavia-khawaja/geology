import { login } from '@/utils/actions'

export default function LoginForm({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  const error = searchParams.error

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='bg-white bg-opacity-10 p-8 rounded-lg w-96 shadow-lg'>
        <h2 className='text-white text-2xl font-semibold mb-8 text-center'>
          ADMIN LOGIN
        </h2>

        <div className='bg-red-300 alert rounded-none py-3 border-none my-10  uppercase'>
          {error}
        </div>

        <form className='space-y-6' action={login}>
          <div>
            <label
              htmlFor='email'
              className='block text-gray-300 mb-1 font-semibold'
            >
              EMAIL
            </label>
            <input
              id='username'
              type='text'
              placeholder='Enter Email'
              name='email'
              className='input input-bordered w-full text-white bg-transparent border-gray-500 placeholder-gray-400'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-gray-300 mb-1 font-semibold'
            >
              PASSWORD
            </label>
            <input
              id='password'
              type='password'
              placeholder='Enter Password'
              name='password'
              className='input input-bordered w-full text-white bg-transparent border-gray-500 placeholder-gray-400'
            />
          </div>

          <button type='submit' className='btn btn-primary w-full'>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}
