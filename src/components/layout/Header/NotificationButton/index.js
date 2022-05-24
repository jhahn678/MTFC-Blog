import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion'
import IconButton from '@mui/material/IconButton'

const NotificationButton = ({ onClick, containerClass}) => {
  return (
    <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} 
        className={containerClass}
    >
        <IconButton onClick={onClick}
            sx={{ margin: '0 .5vw' }}
        >
            <NotificationsIcon color='secondary' fontSize='large'/>
        </IconButton>
    </motion.div>
  )
}

export default NotificationButton