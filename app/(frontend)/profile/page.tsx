import React from 'react'

export default function Page() {
  return (
    <div className='pt-20 max-w-7xl mx-auto p-4'>
      <div className='w-24 h-24 rounded-full overflow-hidden mb-4'>
        <img
          src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
          alt='User Avatar'
          className='w-full h-full object-cover'
        />
      </div>
      <h1 className='text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200'>
        John Wick
      </h1>
      <p className='text-gray-600 dark:text-gray-400 mb-4'>
        This is the profile page of John Wick.
      </p>

      <div className='space-y-2 bg-gray-100 p-4 rounded-lg'>
        <p>
          <span className='font-semibold'>Email:</span>
          <span className='ml-2 text-gray-700'>johnwick@gmail.com</span>
        </p>
        <p>
          <span className='font-semibold'>Location:</span>
          <span className='ml-2 text-gray-700'>New York, USA</span>
        </p>
        <p>
          <span className='font-semibold'>Member Since:</span>
          <span className='ml-2 text-gray-700'>January 2020</span>
        </p>
      </div>

      {/* Update Profile Form */}
      <div className='mt-6 dark:bg-gray-800 p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
          Update Profile
        </h2>
        {/* success message */}
        <div className='mb-4 p-4 bg-green-100 text-green-800 rounded-lg'>
          Profile updated successfully!
        </div>
        <form>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label
                className='block text-gray-700 dark:text-gray-300 mb-1'
                htmlFor='name'
              >
                Name
              </label>
              <input
                name='name'
                type='text'
                id='name'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
                defaultValue='John Wick'
              />
            </div>

            <div>
              <label
                className='block text-gray-700 dark:text-gray-300 mb-1'
                htmlFor='email'
              >
                Email
              </label>
              <input
                name='email'
                type='email'
                id='email'
                defaultValue='johnwick@gmail.com'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
              />
            </div>

            <div>
              <label
                className='block text-gray-700 dark:text-gray-300 mb-1'
                htmlFor='location'
              >
                Location
              </label>
              <input
                name='location'
                type='text'
                id='location'
                defaultValue='New York, USA'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors '
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

      {/*  */}

      <section>
        <h2 className='text-2xl font-semibold mb-4 mt-6 text-gray-800 dark:text-gray-200'>
          Recent Activities
        </h2>
        <ul className='space-y-4'>
          <li className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
            <p className='text-gray-800 dark:text-gray-200'>
              Liked a post on Geology.
            </p>
            <span className='text-sm text-gray-500'>2 hours ago</span>
          </li>
          <li className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
            <p className='text-gray-800 dark:text-gray-200'>
              Commented on The Wonders of Earthquakes.
            </p>
            <span className='text-sm text-gray-500'>1 day ago</span>
          </li>
          <li className='bg-gray-100 dark:bg-gray-700 p-4 rounded-lg'>
            <p className='text-gray-800 dark:text-gray-200'>
              Updated profile picture.
            </p>
            <span className='text-sm text-gray-500'>3 days ago</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
