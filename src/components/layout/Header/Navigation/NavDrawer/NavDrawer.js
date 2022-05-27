import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import classes from './NavDrawer.module.css'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import StoreIcon from '@mui/icons-material/Store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGetCategoriesQuery } from '../../../../../store/api'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../../../../store/context/auth'

const StyledDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paperAnchorLeft': {
        width: '100vw',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    '& .MuiDrawer-paper': {
        fontSize: '1.2em'
    }
}));  

const NavDrawer = ({ open, setOpen, setShowLogin, setShowRegister }) => {

    const router = useRouter()

    const { authStatus, resetAuthStatus } = useAuthContext()

    const { data: categories, isSuccess } = useGetCategoriesQuery()
    
    return (
        <StyledDrawer open={open} onClose={() => setOpen(false)}>
            <div className={classes.navDrawerHeader}>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon fontSize='large'/>
                </IconButton>
            </div>
            <List>
                {isSuccess &&
                    categories.map(c => 
                        <ListItemButton 
                            key={c._id}
                            sx={{ padding: '2vh 2vw', fontSize: '1.2em'}}
                            onClick={() => router.push(`/category/${c.slug}`)}
                        >{c.title}</ListItemButton>
                    )
                }
                <Divider sx={{ margin: '3vh 0 1vh'}}/>
                {

                }
                { authStatus.isAuthenticated ?
                    <>
                        <ListItemButton onClick={() => router.push('/user')}>
                            <ListItemIcon><AccountCircleIcon color='primary'/></ListItemIcon>
                            <ListItemText primary='Profile'/>
                        </ListItemButton>
                        <ListItemButton onClick={() => router.push('/user?tab=notifications')}>
                            <ListItemIcon><NotificationsIcon color='primary'/></ListItemIcon>
                            <ListItemText primary='Notifications'/>
                        </ListItemButton>
                        <ListItemButton onClick={() => router.push('/user?tab=bookmarks')}>
                            <ListItemIcon><BookmarksIcon color='primary'/></ListItemIcon>
                            <ListItemText primary='Bookmarks'/>
                        </ListItemButton>
                    </> : 
                    <>
                        <ListItemButton onClick={() => setShowLogin(true)}>
                            <ListItemIcon><LoginIcon color='primary'/></ListItemIcon>
                            <ListItemText primary='Sign in'/>
                        </ListItemButton>
                        <ListItemButton onClick={() => setShowRegister(true)}>
                            <ListItemIcon><PersonAddAlt1Icon color='primary'/></ListItemIcon>
                            <ListItemText primary='Get started'/>
                        </ListItemButton>
                    </>
                }
                <Divider sx={{ margin: '1vh'}}/>
                <ListItemButton onClick={() => window.location='https://mountaintroutflyco.com'}>
                    <ListItemIcon><StoreIcon color='primary'/></ListItemIcon>
                    <ListItemText primary='MTFC Shop'/>
                </ListItemButton>
                {
                    authStatus.isAuthenticated && <>
                    <Divider sx={{ margin: '1vh' }}/>
                    <ListItemButton onClick={() => resetAuthStatus()}>
                        Logout<LogoutIcon sx={{paddingLeft: '5px'}}/>
                    </ListItemButton>
                    </>
                }
            </List>
        </StyledDrawer>
    )
}

export default NavDrawer;