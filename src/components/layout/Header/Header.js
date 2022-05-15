import { useState } from 'react'
import classes from './Header.module.css'
import Logo from './Logo/Logo'
import NavDrawer from './Navigation/NavDrawer/NavDrawer'
import TopNav from './Navigation/TopNav/TopNav'
import BottomNav from './Navigation/BottomNav/BottomNav'
import SearchBar from './Search/SearchBar'
import LoginModal from '../../shared/Login/LoginModal'
import RegisterModal from '../../shared/Register/RegisterModal'

const Header = () => {

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    return (
      <div className={classes.header}>
          <Logo className={classes.logo}/>
          <TopNav 
            setDrawerOpen={setDrawerOpen} 
            setShowSearch={setShowSearch} 
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
          />
          <SearchBar show={showSearch} setShow={setShowSearch}/>
          <NavDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
          <BottomNav/>
          <LoginModal open={showLogin} setOpen={setShowLogin}/>
          <RegisterModal open={showRegister} setOpen={setShowRegister}/>
      </div>
    )
}

export default Header