import { useState } from 'react'
import classes from './index.module.css'
import { useDeleteNotificationsMutation } from '../../../../store/api'
import { useAuthContext } from '../../../../store/context/auth'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'

const ReplyNotification = ({ data, setNotifications }) => {

  const { setAuthStatus } = useAuthContext()

  const [ deleteNotifications ] = useDeleteNotificationsMutation()

  const handleDelete = async () => {
    try{
        const res = await deleteNotifications([data._id]).unwrap()
        setAuthStatus((state) => ({ ...state, user: res}))
        setNotifications(res.notifications)
    }catch(err){
        toast.error(err)
    }
}

  return (
    <Paper className={classes.notification}>
      <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
      <h3>{data.title}</h3>
    </Paper>
  )
}

export default ReplyNotification