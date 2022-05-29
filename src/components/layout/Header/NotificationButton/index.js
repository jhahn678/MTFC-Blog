import { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion } from 'framer-motion'
import { useAuthContext } from '../../../../store/context/auth'
import { useRouter } from 'next/router'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

const NotificationButton = ({ containerClass}) => {

  const router = useRouter()

  const { authStatus } = useAuthContext()

  const [hasNotifications, setHasNotifications] = useState(0)

  useEffect(() => {
    authStatus?.user?.notifications?.find(n => n.status === 'Unread') ?
    setHasNotifications(1) : setHasNotifications(0)
  },[authStatus?.user?.notifications])

  return (
    <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} 
        className={containerClass} style={{ marginRight: 6 }}
    >
      <Badge badgeContent={hasNotifications} variant='dot' color='error' componentsProps={{ 
          badge: { sx: { transform: 'translateX(-8px) translateY(7px)', height: '12px', width: '12px', borderRadius: '50%' } }
        }}
      >
        <IconButton onClick={() => router.push('/user?tab=notifications')}>
          <NotificationsIcon color='secondary' fontSize='large'/>
        </IconButton>
      </Badge>
    </motion.div>
  )
}

export default NotificationButton