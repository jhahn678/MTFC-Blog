import classes from './NotificationsTab.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NotificationsTab = ({ data }) => {

    const [notifications, setNotifications] = useState(data)

    return (
        <section>
            {
                notifications.map(n => 
                    <p key={n._id}>{n.notification_type}</p>
                )
            }
        </section>
    )

}

export default NotificationsTab