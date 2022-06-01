import React from 'react'
import classes from './result.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import PostsIcon from '../../../../shared/PostsIcon'

const CategoryResult = ({ data }) => {
  return (
    <Link href={`/author/${data._id}`} key={data._id}>
        <Paper component='li' className={classes.containerCategory}>
            <h4 className={classes.type}>Category</h4>
            <div className={classes.categoryThumbnail}>
                <Image src={data.thumbnail} alt={data.title} layout='fill'/>
            </div>
            <div className={classes.content}>
                <h2 className={classes.name}>{data.title}</h2>
                <p className={classes.preview}>{data.description}</p>
            </div>
        </Paper>   
    </Link>
  )
}

export default CategoryResult