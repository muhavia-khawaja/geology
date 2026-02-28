import React from 'react'
import {
  Shield,
  Users,
  Activity,
  Mail,
  Terminal,
  Fingerprint,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className='bg-[#0A0A0B] min-h-screen py-32 md:py-48 relative overflow-hidden selection:bg-[#6A1E55]/30'>
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-[#6A1E55]/5 blur-[120px] rounded-full -mr-64 -mt-64' />

      <div className='max-w-5xl mx-auto px-6 relative z-10'>
        <header className='mb-24 space-y-6'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6A1E55]/10 border border-[#6A1E55]/30'>
            <Fingerprint size={12} className='text-[#A64D79]' />
            <span className='text-[10px] font-black uppercase tracking-[0.4em] text-[#A64D79]'>
              Dossier: Gravestone_Core
            </span>
          </div>
          <h1 className='text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.85]'>
            The <span className='text-[#6A1E55]'>Registry.</span>
          </h1>
          <p className='text-lg md:text-xl text-white/40 font-medium max-w-2xl italic'>
            Monitoring the Earths structural integrity through advanced seismic
            decryption and geological intelligence.
          </p>
        </header>

        <div className='grid grid-cols-1 gap-12'>
          <div className='group relative grid md:grid-cols-12 gap-8 items-start border-t border-white/5 pt-12 transition-colors hover:border-[#6A1E55]/30'>
            <div className='md:col-span-4'>
              <div className='flex items-center gap-3 text-[#A64D79] mb-4'>
                <Shield size={18} />
                <h2 className='text-xs font-black uppercase tracking-[0.3em]'>
                  System Purpose
                </h2>
              </div>
              <p className='text-[10px] font-mono text-white/20 uppercase tracking-widest'>
                Access Level: 01
              </p>
            </div>
            <div className='md:col-span-8 space-y-6'>
              <h3 className='text-3xl font-bold text-white tracking-tight uppercase italic'>
                What is Gravestone?
              </h3>
              <p className='text-white/50 leading-relaxed text-base font-medium'>
                Gravestone is an apex intelligence platform dedicated to the
                decryption of Earth&apos;s physical history. We don&apos;t just study
                rocks; we interpret the{' '}
                <span className='text-white italic'>sub-surface signals</span>{' '}
                that dictate the future of our physical landscape. Our mission
                is to provide high-fidelity geological intelligence to those
                navigating the field.
              </p>
            </div>
          </div>

          <div className='group relative grid md:grid-cols-12 gap-8 items-start border-t border-white/5 pt-12 transition-colors hover:border-[#6A1E55]/30'>
            <div className='md:col-span-4'>
              <div className='flex items-center gap-3 text-[#A64D79] mb-4'>
                <Users size={18} />
                <h2 className='text-xs font-black uppercase tracking-[0.3em]'>
                  The Collective
                </h2>
              </div>
              <p className='text-[10px] font-mono text-white/20 uppercase tracking-widest'>
                Access Level: 04
              </p>
            </div>
            <div className='md:col-span-8 space-y-6'>
              <h3 className='text-3xl font-bold text-white tracking-tight uppercase italic'>
                Field Operatives
              </h3>
              <p className='text-white/50 leading-relaxed text-base font-medium'>
                Our team is a fragmented network of veteran geologists, seismic
                researchers, and data educators. We are unified by a singular
                objective: fostering a deeper, raw understanding of our planet&apos;s
                violent and silent shifts.
              </p>

              <div className='bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <Activity className='text-[#6A1E55]' size={20} />
                  <span className='text-[10px] font-black uppercase tracking-widest text-white/40'>
                    Active Neural Network Status
                  </span>
                </div>
                <span className='text-[10px] font-mono text-green-500 uppercase'>
                  Synchronized
                </span>
              </div>
            </div>
          </div>

          <div className='group relative grid md:grid-cols-12 gap-8 items-start border-t border-b border-white/5 py-12 transition-colors hover:border-[#6A1E55]/30'>
            <div className='md:col-span-4'>
              <div className='flex items-center gap-3 text-[#A64D79] mb-4'>
                <Mail size={18} />
                <h2 className='text-xs font-black uppercase tracking-[0.3em]'>
                  Contact Uplink
                </h2>
              </div>
              <p className='text-[10px] font-mono text-white/20 uppercase tracking-widest'>
                Access Level: Public
              </p>
            </div>
            <div className='md:col-span-8 space-y-8'>
              <h3 className='text-3xl font-bold text-white tracking-tight uppercase italic'>
                Initialize Contact
              </h3>
              <p className='text-white/50 leading-relaxed text-base font-medium'>
                Queries, suggestions, or tactical contributions to the registry
                are processed via our secure uplink.
              </p>

              <a
                href='mailto:contact@geologyplatform.com'
                className='inline-flex items-center gap-4 group/mail'
              >
                <div className='w-12 h-12 bg-[#6A1E55] rounded-xl flex items-center justify-center transition-transform group-hover/mail:scale-110'>
                  <Terminal size={20} className='text-white' />
                </div>
                <span className='text-xl font-black text-white group-hover/mail:text-[#A64D79] transition-colors underline underline-offset-8 decoration-[#6A1E55]/40'>
                  contact@geologyplatform.com
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className='mt-24 flex justify-center'>
          <div className='text-center space-y-2'>
            <div className='h-8 w-[1px] bg-gradient-to-b from-[#6A1E55] to-transparent mx-auto mb-4' />
            <p className='text-[9px] font-mono text-white/10 uppercase tracking-[0.5em]'>
              System_End_Log // Gravestone_Final_Auth
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
