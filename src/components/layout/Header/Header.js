import { useState } from 'react'
import classes from './Header.module.css'
import Logo from './Logo/Logo'
import NavDrawer from './Navigation/NavDrawer/NavDrawer'
import TopNav from './Navigation/TopNav/TopNav'
import BottomNav from './Navigation/BottomNav/BottomNav'
import SearchBar from './Search/SearchBar'
import LoginModal from '../../shared/Login/LoginModal'
import RegisterModal from '../../shared/Register/RegisterModal'
import { useModalContext } from '../../../store/context/modal'

const Header = () => {

    const { setShowRegister, showRegister, setShowLogin, showLogin} = useModalContext()

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    return (
      <div className={classes.header}>
          <img src={'https://images.ctfassets.net/fnhljsxx2y84/7jk8JFntA63YKvsjPNO4Ai/8213c894910ad02278dead8b37db962f/fish-background.png'} className={classes.headerBG}/>
          <Logo className={classes.logo}/>
          <TopNav 
            setDrawerOpen={setDrawerOpen} 
            setShowSearch={setShowSearch} 
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
          <SearchBar show={showSearch} setShow={setShowSearch}/>
          <NavDrawer 
            open={drawerOpen} 
            setOpen={setDrawerOpen} 
            setShowLogin={setShowLogin} 
            setShowRegister={setShowRegister}
          />
          <BottomNav/>
          <LoginModal open={showLogin} setOpen={setShowLogin}/>
          <RegisterModal open={showRegister} setOpen={setShowRegister}/>
      </div>
    )
}

export default Header