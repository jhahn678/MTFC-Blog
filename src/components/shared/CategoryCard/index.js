import React from 'react'
import classes from './CategoryCard.module.css'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import Image from 'next/image'

const CategoryCard = ({ category, containerClass}) => {
    return (
        <Link href={`/category/${category.slug}`}>
            <Paper component='li' className={containerClass}>
                <Image src={category.thumbnail} alt={category.title} layout='fill' className={classes.image}/>
                <div className={classes.content}>
                    <h3 className={classes.title}>{category.title}</h3>
                </div>
            </Paper>
        </Link>
    )
}

export default CategoryCard