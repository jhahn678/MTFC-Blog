import React from 'react'
import classes from './AuthorCard.module.css'
import Paper from '@mui/material/Paper'
import { formatDate } from '../../../utils/formatDate'
import ArticleIcon from '@mui/icons-material/Article';
import CommentIcon from '@mui/icons-material/Comment';
import CategoryChip from '../buttons/CategoryChip'
import FollowButton from '../buttons/FollowButton'
import Badge from '@mui/material/Badge'
import Link from 'next/link'
import Button from '@mui/material/Button'

const AuthorCard = ({ author }) => {

    
    return (
        <Paper className={classes.container}>
            <Link href={`/author/${author._id}`}>
                <div className='frac' style={{ cursor: 'pointer' }}>
                    <div className={classes.avatar}>
                        <img src={author.avatar} alt={author.displayName}/>
                    </div>
                    <div className='fc' style={{ marginRight: '2vw' }}>
                        <h1 className={classes.name}>{author.displayName}</h1>
                        <p className={classes.date}>Author since {formatDate(author.createdAt)}</p>
                    </div>
                    <FollowButton author={author}/>
                </div>
            </Link>
            <div>
                <h3 className={classes.header}>
                    Recent Posts
                    <Badge badgeContent={author.posts.length} color='secondary'>
                        <Link href={`/author/${author._id}`}>
                            <ArticleIcon sx={{ marginLeft: 1, cursor: 'pointer' }}/>
                        </Link>
                    </Badge>
                </h3>
                {
                    author.posts.slice(-3).map(p => (
                        <Link href={`/post/${p.slug}`}>
                            <div className={classes.post}>
                                <h2 className={classes.title}>{p.title}</h2>
                                <div className='frse' style={{ width: '80%'}}>
                                    <span style={{ marginLeft: '1em'}}>
                                        in
                                        <CategoryChip title={p.category.title} 
                                            slug={p.category.slug} 
                                            styles={{ padding: 0, marginLeft: '.5em' }}
                                        />
                                    </span>
                                    <p style={{ marginLeft: '1.5em', fontSize: '.8em'}}>posted at {formatDate(p.createdAt)}</p>
                                    <Badge badgeContent={p.comments.length} color='secondary' showZero sx={{ marginLeft: 15 }}>
                                        <CommentIcon/>
                                    </Badge>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </Paper>
    )
}

export default AuthorCard