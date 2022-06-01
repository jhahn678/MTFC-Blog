import React from 'react'
import classes from './result.module.css'
import { formatDateAuthor } from '../../../../../utils/formatDate'
import Link from 'next/link'
import Paper from '@mui/material/Paper'
import PostsIcon from '../../../../shared/PostsIcon'


const AuthorResult = ({ data }) => {
  return (
    <Link href={`/author/${data._id}`} key={data._id}>
        <Paper component='li' className={classes.containerAuthor}>
            <h4 className={classes.type}>Author</h4>
            <div className={classes.avatar}>
                <img src={data.avatar} alt={data.displayName}/>
                <h2 className={classes.name}>{data.displayName}</h2>
            </div>
            <div className='fc'>
                <div className={classes.preview}>
                    <p>{data.bio}</p>
                </div>
                <div className={classes.footer}>
                    <p className={classes.createdAt}>Author since <i>{formatDateAuthor(data.createdAt)}</i></p>
                    <PostsIcon totalPosts={data.totalPosts}/>
                </div>
            </div>
        </Paper>   
    </Link>
  )
}

export default AuthorResult