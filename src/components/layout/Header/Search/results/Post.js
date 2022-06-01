import React from 'react'
import classes from './result.module.css'
import { formatDate } from '../../../../../utils/formatDate'
import Link from 'next/link'
import Paper from '@mui/material/Paper'
import CategoryChip from '../../../../shared/buttons/CategoryChip'
import AvatarChip from '../../../../shared/AvatarChip'
import CommentIcon from '../../../../shared/Comment/CommentIcon'

const PostResult = ({ data }) => {
    return (
        <Link href={`/post/${data.slug}`} key={data._id}>
            <Paper component='li' className={classes.container}>
                <h4 className={classes.type}>Post</h4>
                <div className='fc'>
                    <h3 className={classes.title}>{data.title}</h3>
                    <div className={classes.chips}>
                        <AvatarChip author={data.author} styles={{ padding: 0}}/>
                        <CategoryChip title={data.category.title} slug={data.category.slug}
                            styles={{ padding: 0, marginLeft: 1}}
                        />
                    </div>
                </div>
                <div className='fc'>
                    <div className={classes.preview}>
                        <p>{data.preview}</p>
                    </div>
                    <div className={classes.footer}>
                        <p style={{ fontSize: '.8em', margin: 0 }}>{formatDate(data.createdAt)}</p>
                        <CommentIcon commentCount={data.commentCount}/>
                    </div>
                </div>
            </Paper>   
        </Link>
    )
}

export default PostResult