import { useState, useRef, useEffect } from 'react'
import classes from './CommentSection.module.css'
import { useCreateCommentMutation, useLazyGetPostCommentsQuery } from '../../../store/api'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Comment from '../Comment/Comment'
import { useModalContext } from '../../../store/context/modal'
import { useAuthContext } from '../../../store/context/auth'
import LoginIcon from '@mui/icons-material/Login';
import Collapse from '@mui/material/Collapse';
import { motion } from 'framer-motion'
import Card from '@mui/material/Card'

const CommentSection = ({ cardClass, post }) => {

    const commentRef = useRef()

    const { setShowLogin } = useModalContext()
    const { authStatus, setAuthStatus } = useAuthContext()

    const [ createComment ] = useCreateCommentMutation()
    const [ getComments, { data }] = useLazyGetPostCommentsQuery()

    const [commentCount, setCommentCount] = useState('')
    const [comments, setComments] = useState([])
    const [expandComments, setExpandComments] = useState(true)

    const refetch = () => {
        getComments(post.slug)
    }

    useEffect(() => {
        refetch()
    },[post])

    useEffect(() => {
        if(data){
            setComments(data.comments)
            setCommentCount(data.commentCount)
        }
    },[data])

    const handleComment = async () => {
        if(commentRef.current.value.length > 0){
            try{
                const res = await createComment({ postId: post._id, body: commentRef.current.value}).unwrap()
                toast.success('Comment sent')
                commentRef.current.value = ''
                setComments(res.post.comments)
                setCommentCount(res.post.commentCount)
                setAuthStatus((state) => ({
                    ...state,
                    user: res.user
                }))
            }catch(err){
                toast.error(err)
            }
        }
    }

    return (
        <Card className={cardClass}>
            <h3 className={classes.commentHeader}>Comments ({commentCount})
                <motion.div className={`${classes.expandComments} ${ !expandComments && classes.hide}`} 
                    onClick={() => setExpandComments(e => !e)}
                >
                    <ExpandMore/>
                </motion.div>
            </h3>
            <Collapse in={expandComments}>
                { comments.map(c => <Comment key={c._id} comment={c} refetch={refetch}/>) }
                { authStatus.isAuthenticated ? 
                    <TextField multiline={true}
                        maxRows={3}
                        label='Leave a comment'
                        inputRef={commentRef}
                        InputProps={{
                            endAdornment: 
                                <IconButton sx={{ padding: 0 }} onClick={handleComment}>
                                    <SendIcon/>
                                </IconButton>
                        }}
                        sx={{ marginBottom: 1, marginTop: 1, width: '100%' }}
                    /> : 
                    <Button variant='contained' 
                        endIcon={<LoginIcon/>}
                        onClick={() => setShowLogin(true)}
                        sx={{ margin: '1em 0 .5em', width: '100%' }}
                    >Sign in to leave a comment
                    </Button>
                }
            </Collapse>  
        </Card>
    )
}

export default CommentSection