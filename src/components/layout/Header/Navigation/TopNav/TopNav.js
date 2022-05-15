import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import classes from './TopNav.module.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { motion } from 'framer-motion'


const TopNav = ({ setDrawerOpen, setShowSearch, setShowLogin, setShowRegister}) => {

    const breakpoint = useMediaQuery('(min-width: 800px)')

    return (
        <div className={classes.navbar}>
            <div>
                {breakpoint && <>
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
                { breakpoint &&
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