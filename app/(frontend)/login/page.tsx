import React from 'react'

export default async function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black px-4 py-8 md:px-0 md:py-0'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl p-8'>
        <h1 className='text-2xl font-semibold text-center mb-2'>
          Welcome back
        </h1>
        <p className='text-center text-sm text-gray-500 mb-4'>
          Please login to your account
        </p>

        <div className='divider text-xs'>Continue with</div>

        <form>
          <label className='form-control w-full mb-2'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='email'
              placeholder='m@example.com'
              name='email'
              required
              className='input input-bordered w-full'
            />
          </label>

          <div className='flex justify-between items-center'>
            <label className='label label-text'>Password</label>
          </div>
          <input
            type='password'
            placeholder='••••••••'
            name='password'
            required
            className='input input-bordered w-full mb-4'
          />
          <button className='btn btn-neutral w-full capitalize'>Sign In</button>
        </form>

        <p className='text-center text-sm mt-4 inline-block'>
          Don’t have an account?
          <p className='link link-hover inline-block ml-2'>Sign up</p>
        </p>
      </div>
    </div>
  )
}
