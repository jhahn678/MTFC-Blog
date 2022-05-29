import { useState, useEffect } from 'react'
import classes from './index.module.css'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PostNotification from '../../notification/PostNotification'
import ReplyNotification from '../../notification/ReplyNotification'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../../../store/context/auth'
import { useTestNotificationMutation,
    useLazyGetMyNotificationsQuery, 
    useDeleteNotificationsMutation, 
    useMarkNoticationReadMutation 
} from '../../../../store/api'

const NotificationsTab = ({ data }) => {

    const { setAuthStatus } = useAuthContext()

    const [notifications, setNotifications] = useState([])

    const [ getNotifications, { isLoading }] = useLazyGetMyNotificationsQuery()
    const [ deleteNotifications ] = useDeleteNotificationsMutation()
    const [ markRead ] = useMarkNoticationReadMutation()
    const [ testNotification ] = useTestNotificationMutation()

    const handleDeleteAll = async () => {
        try{
            const array = notifications.map(n => n._id)
            const res = await deleteNotifications(array).unwrap()
            setAuthStatus((state) => ({ ...state, user: res}))
            setNotifications([])
        }catch(err){
            toast.error(err)
        }
    }

    const handleTest = async () => {
        try{
            const res = await testNotification().unwrap()
            setAuthStatus((state) => ({ ...state, user: res}))
            setNotifications(res.notifications)
        }catch(err){
            toast.error(err)
        }
    }

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
        markRead()
            .then(res => setAuthStatus((state) => ({ ...state, user: res.data })))
            .catch(err => toast.error(err))
    },[])


    return (
        <section className={classes.page}>
            <div className={classes.clear}>
                <p>{notifications.length}</p>
                <p><i>{notifications.length === 1 ? 'Notification' : 'Notifications'}</i></p>
                <Button variant='contained' onClick={handleTest} sx={{ marginLeft: '2vw'}} sx={{ padding: '0px 4px', marginRight: 1 }}>Test</Button>
                <Button variant='outlined' onClick={handleDeleteAll} endIcon={<DeleteSweepIcon/>} sx={{ padding: '0px 10px' }}>Clear all</Button>
            </div>
            <div className={classes.notificationsContainer}>
                { notifications.map(n => {
                    if(n.notification_type === 'Post') return <PostNotification key={n._id} data={n} setNotifications={setNotifications}/>
                    if(n.notification_type === 'Reply') return <ReplyNotification key={n._id} data={n} setNotifications={setNotifications}/>
                })}
            </div>
        </section>
    )

}

export default NotificationsTab