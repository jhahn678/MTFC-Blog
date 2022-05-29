import classes from './NotificationsTab.module.css'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
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

    const handleDelete = async (id) => {
        try{
            const res = await deleteNotifications([id]).unwrap()
            setAuthStatus((state) => ({ ...state, user: res}))
            setNotifications(res.notifications)
        }catch(err){
            toast.error(err)
        }
    }

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
        <section>
            <div className='frac' style={{ marginTop: '2vh'}}>
                <Button variant='outlined' onClick={handleDeleteAll} endIcon={<DeleteSweepIcon/>}>Remove all</Button>
                <Button variant='contained' onClick={handleTest} sx={{ marginLeft: '2vw'}}>Test</Button>
            </div>
            {
                notifications.map(n => 
                    <Paper className={classes.notification} key={n._id}>
                        <IconButton onClick={() => handleDelete(n._id)}><DeleteIcon/></IconButton>
                        <p key={n._id}>{n.notification_type}</p>
                    </Paper>
                )
            }
        </section>
    )

}

export default NotificationsTab