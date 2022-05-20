import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react'
import { useAuthContext } from '../../../../../store/context/auth'

const BottomNav = ({ }) => {

    const breakpoint = useMediaQuery('(max-width: 600px)')
    const [current, setCurrent] = useState('')

    const { authStatus } = useAuthContext()

    return (
        breakpoint && authStatus.isAuthenticated && 
        <BottomNavigation
            sx={{ position: 'fixed', bottom: 0, width: '100vw', zIndex: 5}}
            value={current}
            onChange={(e, v) => setCurrent(v)}
        >
            <BottomNavigationAction label='Home' icon={<HomeIcon/>}/>
            <BottomNavigationAction label='Notifications' icon={<NotificationsIcon/>}/>
            <BottomNavigationAction label='Bookmarks' icon={<BookmarksIcon/>}/>
        </BottomNavigation>
    )
}

export default BottomNav