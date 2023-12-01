import React from 'react'
import { newtonsCradle } from 'ldrs'

const ArticleDetailSkeleton = () => {
    newtonsCradle.register()

    return (
        <div className='items-center justify-center w-[100vw] h-[50vw] flex'>
            <l-newtons-cradle
                size="150"
                speed="1.4"
                color="#d09d1d"
            />
        </div>
    )
}

export default ArticleDetailSkeleton