import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from 'framer-motion'
import IconButton from '@mui/material/IconButton'

const SearchButton = ({ onClick, containerClass }) => {
  return (
    <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}}
        className={containerClass}
    >
        <IconButton onClick={onClick}
            sx={{ margin: '0 .5vw'}}
        >
            <SearchIcon color='secondary' fontSize='large'/>
        </IconButton>
    </motion.div>
  )
}

export default SearchButton