import React from 'react'

export default function AboutPage() {
  return (
    <div className='py-20 max-w-7xl mx-auto px-4'>
      <h1 className='text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-gray-100'>
        About Geology
      </h1>

      {/* About Section Card */}
      <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
          What is Geology?
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          Geology is a comprehensive platform dedicated to the study and
          exploration of Earth&apos;s physical structure, substances, history,
          and processes. Our mission is to provide accurate and up-to-date
          geological information to enthusiasts, researchers, and professionals
          in the field.
        </p>
      </div>

      {/* Team Section Card */}
      <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
          Our Team
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          Our team consists of experienced geologists, researchers, and
          educators passionate about sharing knowledge and fostering a deeper
          understanding of our planet.
        </p>
      </div>

      {/* Contact Section Card */}
      <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
          Contact Us
        </h2>
        <p className='text-gray-600 dark:text-gray-400 mb-2'>
          If you have any questions, suggestions, or would like to contribute to
          our platform, please feel free to reach out to us at:
        </p>
        <a
          href='mailto:contact@geologyplatform.com'
          className='text-blue-600 dark:text-blue-400 hover:underline'
        >
          contact@geologyplatform.com
        </a>
      </div>
    </div>
  )
}
