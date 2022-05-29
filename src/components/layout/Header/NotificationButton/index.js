import { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../../store/context/auth'
import Link from 'next/link'
import Badge from '@mui/material/Badge'

const NotificationButton = ({ containerClass}) => {

  const { authStatus } = useAuthContext()

  const [hasNotifications, setHasNotifications] = useState(0)

  useEffect(() => {
    authStatus?.user?.notifications?.find(n => n.status === 'Unread') ?
    setHasNotifications(1) : setHasNotifications(0)
  },[authStatus?.user?.notifications])

  return (
    <Link href='/user?select=notifications'>
        <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} 
            className={containerClass} style={{ marginRight: 6 }}
        >
          <Badge badgeContent={hasNotifications} variant='dot' color='error' componentsProps={{ badge: { sx: { transform: 'translate(-2px)', height: '12px', width: '12px', borderRadius: '50%' }}}}>
            <NotificationsIcon color='secondary' fontSize='large'/>
          </Badge>
        </motion.div>
    </Link>
  )
}

export default NotificationButton