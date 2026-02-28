import SuccessToast from '@/components/SuccessToast'
import { getAdmin, updateAdmin } from '@/utils/actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Fingerprint,
  KeyRound,
} from 'lucide-react'
import Link from 'next/link'

type Props = {
  searchParams?: {
    error?: string
    success?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const success = searchParams?.success === 'true'
  const error = searchParams?.error
  const token = cookies().get('token')?.value

  if (!token) redirect('/login')

  const admin = await getAdmin(token)
  if (!admin) redirect('/login')

  return (
    <div className='max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700'>
      <div className='text-center mb-12'>
        <div className='inline-flex p-4 rounded-full bg-[#6A1E55]/10 border border-[#6A1E55]/20 mb-4'>
          <Fingerprint size={32} className='text-[#6A1E55]' />
        </div>
        <h2 className='text-3xl font-black italic text-white tracking-tighter uppercase'>
          Admin_<span className='text-[#6A1E55]'>Profile</span>
        </h2>
        <p className='text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2'>
          Update System Authorization // User_ID: {admin.id.slice(0, 8)}
        </p>
      </div>

      <div className='bg-[#0D0D0F] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden'>
        <div className='absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none'>
          <ShieldCheck size={120} />
        </div>

        {success && (
          <SuccessToast
            text='Identity Parameters Synchronized'
            url='/control/profile'
          />
        )}

        {error && (
          <div className='mb-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 animate-shake'>
            <div className='flex items-center gap-3 text-red-400'>
              <AlertCircle size={18} />
              <p className='text-[10px] font-black uppercase tracking-widest'>
                {error === 'password-short' &&
                  'Validation Error: Password length < 6'}
                {error === 'missing-fields' &&
                  'Validation Error: Required fields null'}
                {error === 'invalid-email' &&
                  'Protocol Error: Invalid Email Format'}
              </p>
            </div>
          </div>
        )}

        <form
          className='grid grid-cols-1 md:grid-cols-2 gap-10'
          action={updateAdmin}
        >
          <input type='hidden' name='id' value={admin.id} />

          <div className='space-y-8'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <User size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Identity_Name
                </span>
              </div>
              <input
                type='text'
                defaultValue={admin.name}
                name='name'
                className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#6A1E55] transition-all'
              />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Mail size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Access_Email
                </span>
              </div>
              <input
                type='email'
                defaultValue={admin.email}
                name='email'
                className='w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#6A1E55] transition-all'
              />
            </div>
          </div>

          <div className='space-y-8 bg-white/[0.02] p-8 rounded-[2rem] border border-white/[0.03]'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-white/30'>
                <Lock size={14} className='text-[#6A1E55]' />
                <span className='text-[10px] font-black uppercase tracking-widest'>
                  Secure_Key
                </span>
              </div>
              <input
                type='password'
                name='password'
                placeholder='Enter new key...'
                className='w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm font-mono text-[#A64D79] focus:outline-none focus:border-[#6A1E55] transition-all'
              />
            </div>

            <label className='flex items-center gap-4 group cursor-pointer'>
              <div className='relative flex items-center'>
                <input
                  type='checkbox'
                  name='updatePassword'
                  className='peer h-6 w-6 opacity-0 absolute cursor-pointer'
                />
                <div className='h-6 w-6 border-2 border-white/10 rounded-lg peer-checked:bg-[#6A1E55] peer-checked:border-[#6A1E55] transition-all flex items-center justify-center'>
                  <KeyRound
                    size={12}
                    className='text-white scale-0 peer-checked:scale-100 transition-transform'
                  />
                </div>
              </div>
              <span className='text-[10px] font-black text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors'>
                Authorize Key Update
              </span>
            </label>
          </div>

          <div className='md:col-span-2 pt-6 border-t border-white/5'>
            <button
              type='submit'
              className='w-full py-5 rounded-2xl bg-[#6A1E55] hover:bg-[#A64D79] text-white font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl shadow-[#6A1E55]/20 flex items-center justify-center gap-4 group'
            >
              <RefreshCcw
                size={18}
                className='group-hover:rotate-180 transition-transform duration-700'
              />
              Commit Identity Changes
            </button>
          </div>
        </form>
      </div>

      <div className='mt-8 text-center'>
        <Link
          href='/control'
          className='text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-[#A64D79] transition-colors'
        >
          Return to Main Terminal
        </Link>
      </div>
    </div>
  )
}
