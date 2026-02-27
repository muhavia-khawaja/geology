import SuccessToast from '@/components/SuccessToast'
import { deleteComment, getAllComments } from '@/utils/actions'
import { Trash2 } from 'lucide-react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const params = searchParams.success
  const success = params === 'true'
  const comments = await getAllComments()
  return (
    <div className='bg-black p-6 rounded-xl border border-gray-800 shadow-lg'>
      <h2 className='text-xl font-semibold text-white mb-4'>Recent Comments</h2>

      <div className='overflow-x-auto'>
        <table className='table'>
          {/* Head */}
          <thead>
            <tr className='text-gray-400'>
              <th>Full Name</th>
              <th>Email</th>
              <th>Message</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>

          {comments.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={4} className='text-center py-6 text-gray-400'>
                  No Comments Made Yet!
                </td>
              </tr>
            </tbody>
          )}

          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className='hover:border-l transition'>
                <td className='font-medium text-white'>{comment.name}</td>

                <td className='text-gray-400'>{comment.email}</td>

                <td className='max-w-xs truncate text-gray-300'>
                  {comment.message}
                </td>

                <td className='text-center'>
                  <form action={deleteComment}>
                    <input type='hidden' name='id' value={comment.id} />
                    <button className='btn btn-sm btn-error btn-outline'>
                      <Trash2 className='w-4 h-4' />
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {success && (
        <SuccessToast url='/control/contact' text='Delete Successfully!' />
      )}
    </div>
  )
}
