import React from 'react'

export const Card = ({icon, title, content}) => {
  return (
    <div className='bg-cardgreen shadow-md p-3 md:p-5 rounded-br-xl text-left text-white flex flex-col gap-4'>
        <div className='p-2 bg-white rounded-full h-10 w-10 flex items-center justify-center'>
            {icon}
        </div>
        <div className='font-bold text-sm'>{title}</div>
        <div className='text-xs'>{content}</div>
    </div>
  )
}
