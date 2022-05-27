import { useState } from 'react'
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import LogoutIcon from '@mui/icons-material/Logout'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../../store/context/auth';
import { useLogoutMutation } from '../../../../store/api';
import Link from 'next/link'

const ProfileMenu = ({ containerClass }) => {

    const { authStatus, resetAuthStatus } = useAuthContext()

    const [ logout ] = useLogoutMutation()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogout = () => {
        logout()
        resetAuthStatus()
    }

    return (
        <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)' }} 
            className={containerClass}
        >
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <AccountCircle color='secondary' fontSize='large'/>
            </IconButton>
            <Menu onClose={() => setAnchorEl(null)} open={!!anchorEl} anchorEl={anchorEl}>
                <MenuList>
                    <Link href='/user'>
                        <MenuItem>
                            <ListItemText primary={`${authStatus?.user?.account?.displayName}`}/>
                        </MenuItem>
                    </Link>
                    <Divider/>
                    <Link href='/user'>
                        <MenuItem>
                            <ListItemText primary='Profile'/>
                        </MenuItem>
                    </Link>
                    <Link href='/user?tab=bookmarks'>
                        <MenuItem>
                            <ListItemText primary='Bookmarks'/>
                            <ListItemIcon><BookmarksIcon sx={{ marginLeft: 1}}/></ListItemIcon>
                        </MenuItem>
                    </Link>
                    <Link href='/user?tab=notifications'>
                        <MenuItem>
                            <ListItemText primary='Notifications'/>
                            <ListItemIcon><NotificationsIcon sx={{ marginLeft: 1}}/></ListItemIcon>
                        </MenuItem>
                    </Link>
                    <Divider/>
                    <MenuItem onClick={handleLogout}>
                        <ListItemText primary='Sign out'/>
                        <ListItemIcon><LogoutIcon sx={{ marginLeft: 1}}/></ListItemIcon>
                    </MenuItem>
                </MenuList>
            </Menu>
        </motion.div>
    )
}

export default ProfileMenu;