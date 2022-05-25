import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useMediaQuery from '@mui/material/useMediaQuery';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react'
import { useAuthContext } from '../../../../../store/context/auth'
import Link from 'next/link'

const BottomNav = ({ }) => {

    const breakpoint = useMediaQuery('(max-width: 600px)')
    const [current, setCurrent] = useState('')

    const { authStatus } = useAuthContext()

    return (
        breakpoint && authStatus.isAuthenticated && 
        <BottomNavigation
            sx={{ position: 'fixed', bottom: 0, width: '100vw', zIndex: 50}}
            value={current}
            onChange={(e, v) => setCurrent(v)}
        >
            <Link href='/'><BottomNavigationAction label='Home' icon={<HomeIcon/>}/></Link>
            <Link href='/user/notifications'><BottomNavigationAction label='Notifications' icon={<NotificationsIcon/>}/></Link>
            <Link href='/user/bookmarks'><BottomNavigationAction label='Bookmarks' icon={<BookmarksIcon/>}/></Link>
        </BottomNavigation>
    )
}

export default BottomNav