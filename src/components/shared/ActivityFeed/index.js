import classes from './ActivityFeed.module.css'
import { formatDateComment } from '../../../utils/formatDate'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Link from 'next/link'
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '../Comment/CommentIcon'



const ActivityFeed = ({ comments }) => {


    return (
        <ul className={classes.feed}>
            { comments.map(c => (
                <Link key={c._id} href={`/post/${c.post.slug}`}>
                    <Paper component='li'className={classes.feedItem}>
                        <header className={classes.header}>
                            <Avatar src={c.user.avatar} 
                                alt={c.user.displayName} 
                                sx={{ backgroundColor: 'var(--primary)', marginRight: .6 }}
                            >{c.user.displayName.slice(0,1)}</Avatar>
                            <p style={{ marginRight: 8, fontSize: '1.1em' }}>{c.user.displayName}</p>
                            <p style={{ marginRight: 8, fontSize: '.9em'}}>commented on</p>
                            <p style={{ fontSize: '1.1em', fontStyle: 'oblique' }}>{c.post.title}</p>
                        </header>
                        <p className={classes.comment}>
                            { c.parentComment && 
                                <i style={{ marginRight: 10 }}>@{c.parentComment.user.displayName || '~deleted~'}</i> 
                            }
                            {c.body}
                        </p>
                        <footer className={classes.footer}>
                            <p>{formatDateComment(c.createdAt)}</p>
                            <div className='frac'>
                                <p>{c.replies.length}</p>
                                <ReplyIcon/>
                                <CommentIcon commentCount={c.post.commentCount}/>
                            </div>
                        </footer>
                    </Paper>
                </Link>
            ))}   
        </ul>
    )
}

export default ActivityFeed