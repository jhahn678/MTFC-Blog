import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import classes from './TopNav.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import ProfileMenu from '../../ProfileMenu'
import NotificationButton from '../../NotificationButton'
import SearchButton from '../../Search/SearchButton'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../../../store/context/auth'
import { useLazyGetMeQuery } from '../../../../../store/api';
import { useEffect } from 'react';
import DrawerButton from '../../DrawerButton'

const TopNav = ({ setDrawerOpen, setShowSearch, setShowLogin, setShowRegister}) => {

    const breakpoint = useMediaQuery('(min-width: 800px)')

    const { authStatus, setAuthStatus } = useAuthContext()
    const [ getMeQuery, { data, isSuccess } ] = useLazyGetMeQuery()

    useEffect(() => {
        const userId = localStorage.getItem('USER_ID')
        if(userId){
            setAuthStatus(state => ({
                ...state,
                isAuthenticated: true
            }))
            getMeQuery()
        }
    },[])

    useEffect(() => {
        if(isSuccess){
            setAuthStatus({
                isAuthenticated: true,
                user: data
            })
        }
    },[isSuccess])

    return (
        <div className={classes.navbar}>
            <div className={classes.authGroup}>
                { breakpoint &&  !authStatus.isAuthenticated && <>
                    <Button variant='contained'
                        color='secondary' 
                        sx={{ borderRadius: '20px' }}
                        onClick={() => setShowRegister(s => !s)}
                    >Get Started</Button>
                    <Button color='secondary' 
                        onClick={() => setShowLogin(s => !s)}
                        sx={{ 
                            marginLeft: '10px', 
                            borderRadius: '20px', 
                            border: '1px solid var(--primary)', 
                            padding: '6px 15px', 
                            '&:hover': { border: '1px solid var(--secondary)' }
                        }}
                    >Sign in</Button>
                </>}
            </div> 
            <div className='frac'>
                <SearchButton onClick={() => setShowSearch(true)} containerClass={classes.buttonContainer}/>
                { breakpoint && authStatus.isAuthenticated && 
                    <>
                        <NotificationButton containerClass={classes.buttonContainer}/>
                        <ProfileMenu containerClass={classes.buttonContianer}/>
                    </>    
                }
                { !breakpoint && <DrawerButton onClick={() => setDrawerOpen(true)} containerClass={classes.buttonContainer}/> }
            </div>
        </div>
)
}

export default TopNav;