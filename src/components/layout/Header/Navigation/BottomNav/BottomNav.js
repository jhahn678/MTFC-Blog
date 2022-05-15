import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react'

const BottomNav = () => {

    const breakpoint = useMediaQuery('(min-width: 800px)')
    const [current, setCurrent] = useState('')

    return (
        breakpoint ? <div/> : 
        <BottomNavigation
            sx={{ position: 'fixed', bottom: 0, width: '100vw'}}
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