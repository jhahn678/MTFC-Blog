import React from 'react'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'

const UserAvatar = ({ user, textClass, avatarStyles, avatarProps }) => {

    return (
        <Link href='/user'>
            <div className='frac' style={{ cursor: 'pointer' }}>
                <Avatar sx={{ backgroundColor: 'var(--primary)', ...avatarStyles }}
                    {...avatarProps}
                    src={user.account?.avatar} 
                    alt={user.account.displayName}>
                    {user.account.displayName.slice(0,1)}
                </Avatar>   
                <h3 className={textClass}>{user.account.displayName}</h3>
            </div>
        </Link> 
    )
}

export default UserAvatar;