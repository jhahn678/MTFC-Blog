import React from 'react'
import Avatar from '@mui/material/Avatar'

const UserAvatar = ({ user, textClass, avatarStyles, avatarProps }) => {

    return (
        <div className='frac'>
            <Avatar sx={{ backgroundColor: 'var(--primary)', ...avatarStyles }}
                {...avatarProps}
                src={user.account?.avatar} 
                alt={user.account.displayName}>
                {user.account.displayName.slice(0,1)}
            </Avatar>   
            <h3 className={textClass}>{user.account.displayName}</h3>
        </div>
    )
}

export default UserAvatar;