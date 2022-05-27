import classes from './PostList.module.css'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import BookmarkIconButton from '../buttons/BookmarkIconButton'
import AvatarChip from '../AvatarChip'
import CategoryChip from '../buttons/CategoryChip'
import { formatDate } from '../../../utils/formatDate'
import CommentIcon from '../Comment/CommentIcon'
import Link from 'next/link'
import Image from 'next/image'


const PostList = ({ posts, containerClass, postClass }) => {

    const [noPostsAvailable, setNoPostsAvailable] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if(posts.length === 0){
                setNoPostsAvailable(true)
            }
        }, 500)

        return () => {
            clearTimeout(timer)
        }
    },[posts])

    return (
        <section className={containerClass}>
        { posts.map(p => 
            <Link href={`/post/${p.slug}`} key={p._id}>
                <Paper className={postClass} style={{ display: 'flex', cursor: 'pointer'}}>
                    <Paper className={classes.imageContainer}>
                        <Image src={p.thumbnail} alt={p.title} layout='fill' objectFit='cover'/>
                    </Paper>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{p.title}
                            <div className='fr'>
                                <AvatarChip author={p.author} styles={{ padding: 0, marginTop: 1 }}/>
                                <CategoryChip title={p.category.title} slug={p.category.slug}
                                    styles={{ width: 'fit-content', padding: 0, marginLeft: 1, marginTop: 1 }}
                                />
                            </div>
                        </h3>
                        <div className={classes.preview}>
                            <p>{p.preview}</p>
                        </div>
                        <div className={classes.footer}>
                            <p style={{ fontSize: '.8em' }}>{formatDate(p.createdAt)}</p>
                            <div className='frac'>
                                <BookmarkIconButton post={p}/>
                                <CommentIcon commentCount={p.commentCount}/>
                            </div>
                        </div>
                    </div>
                </Paper>   
            </Link>
        )}
        { noPostsAvailable && <h3 className={classes.noPostsAvailable}>No posts available..</h3> }
        </section>
    )
}

export default PostList