import React from 'react'
import classes from './Footer.module.css'
import Stack from '@mui/material/Stack'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'

const FooterMiddle = () => {
  return (
    <div className={classes.footerMiddle}>
        <h3>Check out our partner shop</h3>
        <div className={classes.link}>
            <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
            <a href='mountaintroutflyco.com'>Mountain Trout Fly Co.</a>
        </div>
        <h3>Connect with us</h3>
        <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing={{ xs: 2, sm: 2, md: 4 }}
            style={{ marginLeft: '10px' }}
        >
            <InstagramIcon className={classes.icon}/>
            <FacebookIcon className={classes.icon}/>
            <TwitterIcon className={classes.icon}/>
            <PinterestIcon className={classes.icon}/>
        </Stack>
    </div>
  )
}

export default FooterMiddle