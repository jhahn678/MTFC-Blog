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
import AvatarChip from '../AvatarChip'

const PostSlider = ({ posts }) => {

    const router = useRouter()

    const [hover, setHover] = useState(false)

    const [index, setIndex] = useState(0)
    
    const handleNext = () => {
        if(index === posts.length - 1){
            setIndex(0)
        }else{
            setIndex(i => i + 1)
        }
    }

    const handlePrev = () => {
        if(index === 0){
            setIndex(posts.length - 1)
        }else{
            setIndex(i => i - 1)
        }
    }

    return (
        <div className={classes.postSlider}>
            <motion.div className={classes.arrowBack}>
                <IconButton onClick={handlePrev}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </motion.div>
            
            <motion.div key={posts[index]._id}
                className={`${classes.sliderItem} ${hover && classes.sliderItemHover}`} 
                onHoverStart={() => setHover(true)} 
                onHoverEnd={() => setHover(false)}
            >
                <img src={posts[index].thumbnail} alt={`${posts[index].title}`} className={`${classes.image} ${hover && classes.imageHover}`}/>
                <Link href={`/post/${posts[index].slug}`}>
                    <main className={classes.sliderItemContent}>
                        <h4 className={classes.date}>{formatDate(posts[index].createdAt)}</h4>
                        <h1 style={{ margin: '3vh 0 1vh' }}>{posts[index].title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '.5em' }}>
                            <AvatarChip author={posts[index].author}/>
                            <Link href={`/category/${posts[index].category.slug}`}>
                                <Chip 
                                    clickable={true}
                                    label={`${posts[index].category.title}`}
                                    sx={{ padding: '18px 3px', marginLeft: '1em'}}
                                />
                            </Link>
                        </div>
                        <motion.div className={`${classes.viewButtonContainer} ${hover && classes.viewButtonHover}`}>
                            <Button 
                                variant='outlined' 
                                size='large' 
                                className={classes.viewButton}
                                onClick={() => router.push(`/post/${posts[index].slug}`)}
                                sx={{ '&:hover': { backgroundColor: 'var(--secondaryTransparent)' }}}
                            >View article</Button>
                        </motion.div>
                    </main>
                </Link>
            </motion.div>
            
            <motion.div className={classes.arrowForward}>
                <IconButton onClick={handleNext}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </motion.div>
        </div>
    )
}

export default PostSlider