import classes from './NotificationsTab.module.css'
import { useState, useEffect } from 'react'
import { useLazyGetMyNotificationsQuery } from '../../../../store/api'
import Link from 'next/link'

const NotificationsTab = ({ data }) => {

    const [notifications, setNotifications] = useState([])

    const [ getNotifications, { isLoading }] = useLazyGetMyNotificationsQuery()

    useEffect(() => {
        if(!data){
            getNotifications()
                .then(res => {
                    setNotifications(res.data.notifications)
                })
                .catch(err => {
                    toast.error(err)
                })
        }else{
            setNotifications(data)
        }
    },[])

    useEffect(() => {
        console.log(notifications)
    },[notifications])

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