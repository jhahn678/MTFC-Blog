import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';

const PostsIcon = ({ totalPosts }) => {
  return (
      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)'}}>
          <p style={{ margin: 0}}>{totalPosts}</p>
          <ArticleIcon style={{ marginLeft: 1}}/>
      </span>
  )
}

export default PostsIcon