export default function Stack({ length }: { length: number }) {
  return (
    <div className='flex flex-col items-center'>
      <h3 className='border w-32 text-white/70 mb-6 text-center h-10 flex items-center justify-center'>
        Stack {length}
      </h3>

      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className='w-32 h-10 border rounded mb-2 animate-pulse flex items-center justify-center'
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {length - index}
        </div>
      ))}
    </div>
  )
}
