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
import { motion } from 'framer-motion'

const Comment = ({ comment }) => {

    const replyRef = useRef()

    const [replyOpen, setReplyOpen] = useState(false)
    const [repliesOpen, setRepliesOpen] = useState(false)

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <Avatar src={comment.user.thumbnail} alt={comment.user.displayName} sx={{ backgroundColor: 'var(--primary)'}}/>
                <div className={classes.nameAndDate}>
                    <h3 style={{ margin: 0}}>{comment.user.displayName}</h3>
                    <p style={{ margin: 0, fontSize: '.7em'}}>{formatDateComment(comment.createdAt)}</p>
                </div>
            </header>
            <main>
                <p>{ comment.body }</p>
            </main>
            <footer className={classes.footer}>
                <motion.p className={classes.replies} onClick={() => setRepliesOpen(o => !o)}>
                    { comment.replies.length > 0 && <>
                        Replies ({comment.replies.length})
                        {repliesOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </>
                    }
                </motion.p>
                <Collapse in={repliesOpen} unmountOnExit={true}>
                    { comment.replies.map(c => <Comment comment={c}/>) }
                </Collapse>
                <motion.p className={classes.replyToThis}
                    whileHover={{ x: -5 }}
                    onClick={() => setReplyOpen(o => !o)}
                >Reply to this <ReplyIcon sx={{ marginLeft: 1}}/></motion.p>
                <Collapse in={replyOpen} unmountOnExit={true}>
                    <TextField label='Reply'
                        InputProps={{ endAdornment: <IconButton sx={{padding: 0}}><SendIcon/></IconButton> }}
                        sx={{ width: '100%', marginTop: 2 }}
                        multiline={true}
                        maxRows={3}
                        inputRef={replyRef}
                    />
                </Collapse>
            </footer>
        </div>
    )
}

export default Comment