import React from 'react'
import { useRouter } from 'next/router'

const Logo = ({ className }) => {

    const router = useRouter()

    return (
        <img
            className={`${className}`} 
            src={'https://storage.googleapis.com/mtfc-products/MTFC-svg/MTFC-logo.png'} 
            alt={'MTFC logo'}
            style={{ cursor: 'pointer' }} 
            onClick={() => router.push('/')}
        />
    )
}

export default Logo