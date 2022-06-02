import { useState, useRef, useEffect } from 'react'
import classes from './Comment.module.css'
import { formatDateComment } from '../../../utils/formatDate';
import Avatar from '@mui/material/Avatar'
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { motion } from 'framer-motion'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../../../store/context/auth';
import { useDeleteCommentMutation, useCreateReplyMutation, useLazyGetCommentQuery } from '../../../store/api';
import { toast } from 'react-toastify';

const Comment = ({ comment, refetch, removeComment }) => {

    const { authStatus, setAuthStatus } = useAuthContext()

    const [ deleteComment ] = useDeleteCommentMutation()
    const [ createReply ] = useCreateReplyMutation()
    const [ getComment ] = useLazyGetCommentQuery()

    const replyRef = useRef()
    
    const [replies, setReplies] = useState([])
    const [replyOpen, setReplyOpen] = useState(false)
    const [repliesOpen, setRepliesOpen] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)
    const [hideComment, setHideComment] = useState(false)

    
    ////Original fetch only populates first two levels of comments
    ////After expanding replies to a comment, this function runs and
    ////fetches replies that are unpopulated
    const fetchUnpopulatedReplies = async () => {
        if(comment.replies.length > 0 && typeof comment.replies[0] === 'object'){
            setReplies(comment.replies)
        }
        if(comment.replies.length > 0 && typeof comment.replies[0] === 'string'){
            const res = await getComment(comment._id).unwrap()
            setReplies(res.replies)
        }
    }

    ////Passed down to replies beyond two levels of nesting to filter
    ////out immediately after deletion
    const removeFromReplies = (id, setReplies) => {
        setReplies((state) => {
            return [...state.filter(r => r._id !== id)]
        })
    }

    useEffect(() => {
        fetchUnpopulatedReplies()
    },[comment])



    const handleMenu = (e) => {
        menuAnchor ? setMenuAnchor(null) : setMenuAnchor(e.currentTarget)
    }

    const handleDeleteComment = async () => {
        try{
            const res = await deleteComment({
                postId: comment.post, 
                commentId: comment._id
            }).unwrap()
            setAuthStatus((state) => ({
                ...state,
                user: res.user
            }))
            toast.info('Comment deleted')
            removeComment && removeComment()
            refetch()
        }catch(err){
            toast.error('Failed to delete comment')
        }
    }

    const handleEditComment = async () => {
        toast.info('Editing currently disabled')
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
                setReplies(res.comment.replies)
                setAuthStatus((state) => ({
                    ...state,
                    user: res.user
                }))
                toast.success('Reply sent')
                replyRef.current.value = '';
                refetch()
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
                <Avatar src={comment.user?.avatar} alt={comment.user?.displayName} sx={{ backgroundColor: 'var(--primary)'}}>
                    {comment.user?.displayName?.slice(0,1)}
                </Avatar>
                <div className={classes.nameAndDate}>
                    <h3 style={{ margin: 0}}>{comment.user?.displayName || '~deleted by user~'}</h3>
                    <p style={{ margin: 0, fontSize: '.7em'}}>{formatDateComment(comment.createdAt)}</p>
                </div>
            </header>
            <Collapse in={!hideComment}>
                <main>
                    <p>{ comment.body }</p>
                </main>
                <footer className={classes.footer}>
                    <motion.p className={classes.replies} onClick={() => setRepliesOpen(o => !o)}>
                        { comment.replies?.length > 0 && 
                            <>
                                Replies ({comment.replies.length})
                                { <ExpandMoreIcon className={`${classes.expandIcon} ${ !repliesOpen && classes.expand}`}/> }
                            </>
                        }
                    </motion.p>
                    <Collapse in={repliesOpen} unmountOnExit={true}>
                        { replies.map(c => 
                            <Comment 
                                key={c._id} 
                                comment={c} 
                                refetch={refetch}
                                removeComment={() => removeFromReplies(c._id, setReplies)}
                            />
                            ) 
                        }
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
                            autoFocus
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