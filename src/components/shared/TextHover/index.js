import classes from './TextHover.module.css'
import { useState } from 'react'
import { motion } from 'framer-motion'

const TextHover = ({ children }) => {

    const [hover, setHover] = useState(false)

    return (
        <motion.div className={classes.container} onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}>
            {children}
            <motion.div className={`${classes.line} ${hover && classes.hover}`} />
        </motion.div>
    )
}

export default TextHover