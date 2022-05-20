import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import classes from './TopNav.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../../../store/context/auth'
import { useLazyGetMeQuery } from '../../../../../store/api';
import { useEffect } from 'react';


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
            <div style={{ display: 'flex'}}>
                <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}}
                    className={classes.buttonContainer}
                >
                    <IconButton onClick={() => setShowSearch(true)}
                        sx={{ margin: '0 .5vw'}}
                    >
                        <SearchIcon color='secondary' fontSize='large'/>
                    </IconButton>
                </motion.div>
                { breakpoint && authStatus.isAuthenticated && 
                    <>
                        <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} 
                            className={classes.buttonContainer}
                        >
                            <IconButton onClick={() => console.log('Notification')}
                                sx={{ margin: '0 .5vw' }}
                            >
                                <NotificationsIcon color='secondary' fontSize='large'/>
                            </IconButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)' }} className={classes.buttonContainer}>
                            <IconButton onClick={() => console.log('Bookmarks')}
                                sx={{ margin: '0 .5vw' }}
                            >
                                <BookmarksIcon color='secondary' fontSize='large'/>
                            </IconButton>
                        </motion.div>
                    </>
                }
                { !breakpoint &&
                    <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} className={classes.buttonContainer}>
                        <IconButton onClick={() => setDrawerOpen(true)}
                            sx={{ margin: '0 .5vw' }}
                        >
                            <MenuIcon color='secondary' fontSize='large'/>
                        </IconButton>
                    </motion.div>
                }
            </div>
        </div>
)
}

export default TopNav;