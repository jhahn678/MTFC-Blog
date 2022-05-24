import React from 'react'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import classes from './AuthorAvatar.module.css'

const AuthorAvatar = ({ author, className, size='50px' }) => {

    return (
        <Link href={`/author/${author._id}`}>
            <h3 className={`${classes.authorLink} ${className}`}>
                <Avatar src={author.avatar} alt={author.displayName} 
                    sx={{ height: size, width: size, marginRight: '8px'}}
                />
                {author.displayName}
            </h3>
        </Link>
    )
}

export default AuthorAvatar