import classes from './RelatedPosts.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import { formatDate } from '../../../utils/formatDate'

const RelatedPosts = ({ posts, author, sliceLength=3, containerClass, postClass }) => {
    
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(() => {
        setRelatedPosts(posts.slice(-sliceLength))
    },[posts])

    return (
        <div className={containerClass}>
            { relatedPosts.length === 0 && <h4 style={{ textAlign: 'center' }}>This author has no other posts</h4> }
            { relatedPosts.map(p => 
                    <Link href={`/post/${p.slug}`} key={p._id}>
                        <Paper className={postClass}>
                            <Image src={p.thumbnail} alt={p.title} layout='fill' className={classes.image}/>
                            <div className={classes.content}>
                                <h4 className={classes.header}>
                                    {p.title}
                                    <Chip label={`${p.category.title}`} size='small' sx={{ width: 'fit-content', marginTop: 1 }}/>
                                </h4>
                                <div className='frac'>
                                    <Avatar src={author.avatar}/>
                                    <div className={classes.authorGroup}>
                                        <p className={classes.authorName}>{author.displayName}</p>
                                        <p className={classes.createdAt}>{formatDate(p.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Link>
                )
            }  
        </div>
    )
}

export default RelatedPosts;