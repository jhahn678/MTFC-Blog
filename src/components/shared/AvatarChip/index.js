import React from 'react'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'

const AvatarChip = ({ author, styles }) => {
    return (
        <Link href={`/author/${author._id}`}>
            <Chip 
                avatar={
                    <Avatar alt={`${author.displayName} avatar`} 
                        src={`${author.avatar}`}
                        sx={{ border: '1px solid var(--primary)', marginRight: '15px' }} 
                    />}
                clickable={true}
                label={`${author.displayName}`}
                sx={styles ? styles : { padding: '18px 3px'}}
            />
        </Link>
    )
}

export default AvatarChip