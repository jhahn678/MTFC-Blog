import React from 'react'
import MessageIcon from '@mui/icons-material/Message';

const CommentIcon = ({ commentCount }) => {
  return (
      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)'}}>
          <p>{commentCount}</p>
          <MessageIcon style={{ marginLeft: 1}}/>
      </span>
  )
}

export default CommentIcon