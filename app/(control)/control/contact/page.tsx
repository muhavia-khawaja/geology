import SuccessToast from '@/components/SuccessToast'
import { deleteComment, getAllComments } from '@/utils/actions'
import {
  Trash2,
  Mail,
  MessageSquareText,
  User,
  ShieldAlert,
} from 'lucide-react'

export default async function Page({
  searchParams,
}: {
  searchParams: { success: string }
}) {
  const params = searchParams.success
  const success = params === 'true'
  const comments = await getAllComments()

  return (
    <div className='max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
            Secure <span className='text-[#6A1E55]'>Uplinks</span>
          </h2>
          <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2'>
            Intercepted Transmissions // External Source Logs
          </p>
        </div>

        <div className='flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full'>
          <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
          <span className='text-[10px] font-black text-white/40 uppercase tracking-widest'>
            Monitoring Active
          </span>
        </div>
      </div>

      <div className='space-y-4'>
        {comments.length === 0 ? (
          <div className='py-24 text-center bg-[#0D0D0F] border border-dashed border-white/10 rounded-[2.5rem]'>
            <ShieldAlert className='w-10 h-10 text-white/5 mx-auto mb-4' />
            <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.5em]'>
              Zero incoming transmissions detected
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className='group relative bg-[#0D0D0F] border border-white/5 hover:border-[#6A1E55]/30 rounded-3xl p-6 transition-all duration-300'
              >
                <div className='absolute top-6 right-8 opacity-20 group-hover:opacity-100 transition-opacity'>
                  <span className='text-[9px] font-mono text-white tracking-tighter'>
                    MSG_ID: {comment.id.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className='flex flex-col lg:flex-row lg:items-center gap-8'>
                  <div className='flex items-center gap-4 lg:w-64 shrink-0'>
                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/5 group-hover:border-[#6A1E55]/50 transition-colors'>
                      <User
                        size={20}
                        className='text-white/40 group-hover:text-[#A64D79]'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <h4 className='text-sm font-black text-white tracking-tight leading-none'>
                        {comment.name}
                      </h4>
                      <div className='flex items-center gap-2 mt-2 text-white/30'>
                        <Mail size={10} />
                        <span className='text-[10px] font-mono lowercase truncate max-w-[120px]'>
                          {comment.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex-1 flex items-start gap-4 p-4 lg:p-0 bg-white/[0.02] lg:bg-transparent rounded-2xl'>
                    <MessageSquareText
                      size={16}
                      className='text-[#6A1E55] shrink-0 mt-1 opacity-50'
                    />
                    <p className='text-sm text-white/70 leading-relaxed font-medium italic'>
                      {comment.message}
                    </p>
                  </div>

                  <div className='flex items-center justify-end lg:w-32 shrink-0'>
                    <form action={deleteComment} className='w-full lg:w-auto'>
                      <input type='hidden' name='id' value={comment.id} />
                      <button className='flex items-center justify-center gap-2 w-full lg:w-auto px-5 py-3 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/40 rounded-2xl text-red-500 transition-all text-[10px] font-black uppercase tracking-widest'>
                        <Trash2 size={14} />
                        <span className='lg:hidden'>Purge Transmission</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {success && (
        <SuccessToast
          url='/control/contact'
          text='Transmission Purged from Core Memory'
        />
      )}
    </div>
  )
}
