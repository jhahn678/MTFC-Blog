import React from 'react'
import classes from './Footer.module.css'
import Link from 'next/link'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'

const FooterLinks = () => {
  return (
    <div className={classes.footerLinks}>
        <h3>Links</h3>
        <main style={{ display: 'flex' }}>
            <section className={classes.linksGroup}>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px' }}/>
                    <Link href='/'>Home</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/category/tutorials'>Tutorials</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/category/places'>Places</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/category/gear'>Gear</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/category/discussions'>Discussions</Link>
                </div>
            </section>
            <section className={classes.linksGroup}>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px' }}/>
                    <Link href='/user'>Profile</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/user/notifications'>Notifications</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/user/bookmarks'>Bookmarks</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/user/following'>Following</Link>
                </div>
                <div className={classes.link}>
                    <ArrowForwardIos sx={{ fontSize: '14px', marginRight: '5px'}}/>
                    <Link href='/apply'>Become an author</Link>
                </div>
            </section>
        </main>
    </div>
  )
}

export default FooterLinks