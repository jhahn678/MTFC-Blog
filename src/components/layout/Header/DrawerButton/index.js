import React from 'react'
import { motion } from 'framer-motion'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const DrawerButton = ({ containerClass, onClick }) => {
    return (
        <motion.div whileHover={{ scale: 1.1, borderBottomColor: 'var(--secondary)'}} className={containerClass}>
            <IconButton onClick={onClick}
                sx={{ margin: '0 .5vw' }}
            >
                <MenuIcon color='secondary' fontSize='large'/>
            </IconButton>
        </motion.div>
    )
}

export default DrawerButton;