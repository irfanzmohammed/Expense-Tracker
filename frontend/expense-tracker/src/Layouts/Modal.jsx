import React from 'react'

const Modal = ({children,isOpen,onClose,title}) => {
  
  if(!isOpen) return null
  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overscroll-y-auto overflow-x-hidden bg-black/50 bg-opacity-50'>
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        {/* Modal content */}
        <div className='relative bg-gray-800 shadow-sm dark:bg-gray-900 rounded-lg'>
          {/* Modal Header */}
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 '>
            <h3 className='text-lg font-medium text-white'>{title}</h3>
            <button type='button'
             className='text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer' 
             onClick={onClose}>
              X
              </button>
          </div>

          {/* Modal body */}
          <div className='p-4 md:p-5 space-y-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal