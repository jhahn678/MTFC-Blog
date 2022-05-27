import { useState, useRef } from 'react'
import classes from './Comment.module.css'
import { formatDateComment } from '../../../utils/formatDate';
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { motion } from 'framer-motion'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../../../store/context/auth';
import { useDeleteCommentMutation, useCreateReplyMutation } from '../../../store/api';
import { toast } from 'react-toastify';

const Comment = ({ comment, refetch }) => {

    const { authStatus } = useAuthContext()

    const [ deleteComment ] = useDeleteCommentMutation()
    const [ createReply ] = useCreateReplyMutation()

    const replyRef = useRef()
    const [replyOpen, setReplyOpen] = useState(false)
    const [repliesOpen, setRepliesOpen] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)
    const [hideComment, setHideComment] = useState(false)

    const handleMenu = (e) => {
        if(menuAnchor){
            setMenuAnchor(null)
        }else{
            setMenuAnchor(e.currentTarget)
        }
    }

    const handleDeleteComment = async () => {
        try{
            await deleteComment({
                postId: comment.post, 
                commentId: comment._id
            }).unwrap()
            toast.info('Comment deleted')
            refetch()
        }catch(err){
            toast.error('Failed to delete comment')
        }
    }

    const handleEditComment = async () => {
        try{
            console.log('edit')
            toast.info('Comment edited')
        }catch(err){
            toast.error('Failed to edit comment')
        }
    }

    const handleReply = async () => {
        const value = replyRef.current.value
        if(value.length > 0){
            try{
                const res = await createReply({ 
                    commentId: comment._id,
                    postId: comment.post, 
                    body: value
                }).unwrap()
                toast.success('Reply sent')
                replyRef.current.value = '';
                refetch(comment.post)
            }catch(err){
                toast.error('Failed to post reply')
            }
        }
    }
    

    return (
        <div className={classes.container}>
            <IconButton className={classes.commentMenu} onClick={handleMenu}>
                <MoreHorizIcon/>
            </IconButton>
            <Menu anchorEl={menuAnchor} onClose={handleMenu} open={!!menuAnchor}>
                <MenuItem onClick={() => setHideComment(h => !h)}>{ hideComment ? 'Unhide' : 'Hide'}</MenuItem>
                { authStatus.user?._id === comment.user._id && 
                        <MenuItem onClick={handleEditComment}>Edit</MenuItem>
                }
                { authStatus.user?._id === comment.user._id &&
                    <MenuItem onClick={handleDeleteComment}>Delete</MenuItem> 
                }
            </Menu>
            <header className={classes.header}>
                <Avatar src={comment.user.thumbnail} alt={comment.user.displayName} sx={{ backgroundColor: 'var(--primary)'}}>
                    {comment.user.displayName.slice(0,1)}
                </Avatar>
                <div className={classes.nameAndDate}>
                    <h3 style={{ margin: 0}}>{comment.user.displayName || 'Deleted'}</h3>
                    <p style={{ margin: 0, fontSize: '.7em'}}>{formatDateComment(comment.createdAt)}</p>
                </div>
            </header>
            <Collapse in={!hideComment}>
                <main>
                    <p>{ comment.body }</p>
                </main>
                <footer className={classes.footer}>
                    <motion.p className={classes.replies} onClick={() => setRepliesOpen(o => !o)}>
                        { comment.replies?.length > 0 && <>
                            Replies ({comment.replies.length})
                            {repliesOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            </>
                        }
                    </motion.p>
                    <Collapse in={repliesOpen} unmountOnExit={true}>
                        { comment.replies?.map(c => <Comment key={c._id} comment={c}/>) }
                    </Collapse>
                    { authStatus.isAuthenticated && comment.user._id &&
                        <motion.p className={classes.replyToThis}
                            whileHover={{ x: -5 }}
                            onClick={() => setReplyOpen(o => !o)}
                        >Reply to this <ReplyIcon sx={{ marginLeft: 1}}/>
                        </motion.p>
                    }
                    <Collapse in={replyOpen} unmountOnExit={true}>
                        <TextField label='Reply'
                            InputProps={{ 
                                endAdornment: 
                                    <IconButton sx={{ padding: 0 }}
                                        onClick={handleReply}
                                    >
                                        <SendIcon/>
                                    </IconButton> 
                            }}
                            sx={{ width: '100%', marginTop: 2 }}
                            multiline={true}
                            maxRows={3}
                            inputRef={replyRef}
                        />
                    </Collapse>
                </footer>
            </Collapse>
        </div>
    )
}

export default Comment