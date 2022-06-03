import React from 'react'
import classes from './Footer.module.css'
import FooterLeft from './FooterLeft'
import FooterMiddle from './FooterMiddle'
import FooterRight from './FooterRight'
import FooterLinks from './FooterLinks'
import { useAuthContext } from '../../../store/context/auth'

const Footer = () => {

  const { authStatus } = useAuthContext()

  return (
    <footer className={`${classes.footer} ${authStatus.isAuthenticated && classes.footerAuth}`}>
      <img src={'https://images.ctfassets.net/fnhljsxx2y84/7jk8JFntA63YKvsjPNO4Ai/8213c894910ad02278dead8b37db962f/fish-background.png'} alt='background watermark' className={classes.footerBG}/>
      <FooterLeft/>
      <FooterMiddle/>
      <FooterLinks/>
      <FooterRight/>
    </footer>
  )
}

export default Footer