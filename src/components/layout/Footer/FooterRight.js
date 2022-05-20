import React from 'react'
import classes from './Footer.module.css'

const FooterRight = () => {
  return (
    <div className={classes.footerRight}>
        <img src='https://storage.googleapis.com/mtfc-products/MTFC-svg/fisherman-casting-f4e5be.svg' 
            alt='fisherman casting svg'
            className={classes.rightImage}
        />
        <p className={classes.copyright}>© MTFC 2022</p>
    </div>
  )
}

export default FooterRight