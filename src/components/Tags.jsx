import React from 'react'

const Tags = ({ TagArray }) => {
  return (
    <>
    {TagArray.length === 0 ? (
        <p className="text-slate-500 text-xs mt-2">
          There are not tags for this post
        </p>
      ) : (
        <ul className='flex flex-row gap-2.5'>
          {TagArray.map((tag, index) =>
            <li key={index} className='rounded-lg bg-yellow-200 bg-opacity-40 px-3 py-1.5 text-yellow-600 font-semibold'>
              {tag}
            </li>
          )}
        </ul>
      )
    }
    </>
  )
}

export default Tags;