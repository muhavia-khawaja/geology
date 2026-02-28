import React from 'react'
import Link from 'next/link'
import { Github, X, Linkedin, Terminal, Shield } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-[#0A0A0B] border-t border-white/5 px-6 py-16 mt-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12 mb-16'>
          <div className='md:col-span-4 space-y-6'>
            <Link href='/' className='group inline-block'>
              <h2 className='text-4xl font-black lowercase tracking-tighter text-white leading-[0.8] italic group-hover:text-[#6A1E55] transition-colors'>
                grave <br />
                stone<span className='text-[#6A1E55]'>.</span>
              </h2>
            </Link>
            <p className='text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed max-w-xs'>
              Advanced seismic intelligence and architectural surveillance
              registry. Sub-surface data decryption since 2024.
            </p>
          </div>

          <div className='md:col-span-3'>
            <h6 className='text-[10px] font-black text-[#A64D79] uppercase tracking-[0.4em] mb-6'>
              System Integration
            </h6>
            <div className='flex flex-col gap-3 text-xs font-bold text-white/50'>
              <a
                href='https://github.com'
                target='_blank'
                className='flex items-center gap-2 hover:text-white transition-colors group'
              >
                <Github size={14} className='group-hover:text-[#6A1E55]' />{' '}
                GitHub Registry
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                className='flex items-center gap-2 hover:text-white transition-colors group'
              >
                <X size={14} className='group-hover:text-[#6A1E55]' /> Neural
                Feed (X)
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                className='flex items-center gap-2 hover:text-white transition-colors group'
              >
                <Linkedin size={14} className='group-hover:text-[#6A1E55]' />{' '}
                Enterprise Node
              </a>
            </div>
          </div>

          <div className='md:col-span-3'>
            <h6 className='text-[10px] font-black text-[#A64D79] uppercase tracking-[0.4em] mb-6'>
              Explore
            </h6>
            <div className='flex flex-col gap-3 text-xs font-bold text-white/50'>
              <Link href='/blog' className='hover:text-white transition-colors'>
                Intelligence Feed
              </Link>
              <Link
                href='/explore'
                className='hover:text-white transition-colors'
              >
                Seismic Archives
              </Link>
              <Link
                href='/contact'
                className='hover:text-white transition-colors'
              >
                Direct Uplink
              </Link>
              <Link
                href='/about'
                className='hover:text-white transition-colors'
              >
                The Collective
              </Link>
            </div>
          </div>

          <div className='md:col-span-2 space-y-4'>
            <div className='p-4 bg-white/[0.02] border border-white/5 rounded-2xl'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
                <span className='text-[9px] font-black text-white/40 uppercase tracking-widest'>
                  System Status
                </span>
              </div>
              <p className='text-[10px] font-bold text-white/60 uppercase'>
                All Nodes Operational
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6'>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest'>
              <Shield size={12} /> Encrypted Session
            </div>
            <div className='flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest'>
              <Terminal size={12} /> V.2.0.4-LTS
            </div>
          </div>

          <div className='text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]'>
            © {currentYear} GRAVESTONE_INTEL // ALL_RIGHTS_RESERVED
          </div>
        </div>
      </div>
    </footer>
  )
}
