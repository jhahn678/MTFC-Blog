import classes from './index.module.css'
import { useDeleteNotificationsMutation } from '../../../../store/api'
import { useAuthContext } from '../../../../store/context/auth'
import Paper from '@mui/material/Paper'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import ReplyIcon from '@mui/icons-material/Reply'
import { formatDateComment } from '../../../../utils/formatDate'
import Link from 'next/link'

const ReplyNotification = ({ data, setNotifications }) => {

  const { setAuthStatus } = useAuthContext()

  const [ deleteNotifications ] = useDeleteNotificationsMutation()

  const handleDelete = async (e) => {
    e.stopPropagation()
    try{
        const res = await deleteNotifications([data._id]).unwrap()
        setAuthStatus((state) => ({ ...state, user: res}))
        setNotifications(res.notifications)
    }catch(err){
        toast.error(err)
    }
}

  return (
    <Link key={data._id} href={`/post/${data.post.slug}`}>
      <Paper className={classes.notification}>
        <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: '2px', right: '1px', padding: '1px' }}>
          <CloseIcon/>
        </IconButton>
        <div className={classes.header}>
                <Avatar src={data.avatar} 
                    alt={data.comment.user.displayName} 
                    sx={{ backgroundColor: 'var(--primary)', marginLeft: 1 }}
                >{data.comment.user.displayName.slice(0,1)}</Avatar>
                <div className={classes.title}>
                  <p style={{ margin: 0, fontSize: '1.1em' }}>{data.title}</p>
                  <p style={{ margin: 0, fontSize: '.9em'}}>in <i>{data.post.title}</i></p>
                </div>
        </div>
        <p className={classes.comment}>
            {data.comment.body}
        </p>
        <div className={classes.footer}>
            <p>{formatDateComment(data.createdAt)}</p>
            <div className='frac' style={{ marginRight: 10}}>
                <p>Reply to this</p>
                <ReplyIcon/>
            </div>
        </div>
      </Paper>
    </Link>
  )
}

export default ReplyNotification