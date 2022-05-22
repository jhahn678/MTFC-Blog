import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import classes from './PostSlider.module.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Button from '../buttons/Button'
import { formatDate } from '../../../utils/formatDate'

const PostSlider = ({ posts }) => {

    const router = useRouter()

    const [hover, setHover] = useState(false)

    return (
        <div className={classes.postSlider}>
            <motion.div className={classes.arrowBack}>
                <IconButton>
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </motion.div>
            {
                posts.map(post => {
                    return(
                        <motion.div key={post._id}
                            className={`${classes.sliderItem} ${hover && classes.sliderItemHover}`} 
                            onHoverStart={() => setHover(true)} 
                            onHoverEnd={() => setHover(false)}
                        >
                            <img src={post.thumbnail} alt={`${post.title}`} className={`${classes.image} ${hover && classes.imageHover}`}/>
                            <Link href={`/post/${post.slug}`}>
                                <main className={classes.sliderItemContent}>
                                    <h4 className={classes.date}>{formatDate(post.createdAt)}</h4>
                                    <h1 style={{ margin: '3vh 0 1vh' }}>{post.title}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '.5em' }}>
                                        <Link href={`/author/${post.author._id}`}>
                                            <Chip 
                                                avatar={
                                                    <Avatar alt={`${post.author.displayName} avatar`} 
                                                        src={`${post.author.avatar}`}
                                                        sx={{ border: '1px solid var(--primary)', marginRight: '15px' }} 
                                                    />}
                                                clickable={true}
                                                label={`${post.author.displayName}`}
                                                sx={{ padding: '18px 3px'}}
                                            />
                                        </Link>
                                        <Link href={`/category/${post.category.slug}`}>
                                            <Chip 
                                                clickable={true}
                                                label={`${post.category.title}`}
                                                sx={{ padding: '18px 3px', marginLeft: '1em'}}
                                            />
                                        </Link>
                                    </div>
                                    <motion.div className={`${classes.viewButtonContainer} ${hover && classes.viewButtonHover}`}>
                                        <Button 
                                            variant='outlined' 
                                            size='large' 
                                            className={classes.viewButton}
                                            onClick={() => router.push(`/post/${post.slug}`)}
                                            sx={{ '&:hover': { backgroundColor: 'var(--secondaryTransparent)' }}}
                                        >View article</Button>
                                    </motion.div>
                                </main>
                            </Link>
                        </motion.div>
                    )
                })
            }
            <motion.div className={classes.arrowForward}>
                <IconButton>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </motion.div>
        </div>
    )
}

export default PostSlider