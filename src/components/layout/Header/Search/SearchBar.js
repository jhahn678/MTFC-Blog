import Modal  from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Paper from '@mui/material/Paper'
import classes from './SearchBar.module.css'
import TextField from "@mui/material/TextField"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from "react"
import Slide from '@mui/material/Slide'

const SearchBar = ({ show, setShow }) => {

    const [input, setInput] = useState('')

    return (
        <Backdrop open={show}>
            <Modal open={show} onClose={e => setShow(false)}>
                <Slide direction='down' in={show} unmountOnExit>
                    <Paper className={classes.modal}>
                        <IconButton className={classes.close} 
                            sx={{ 
                                position: 'absolute',
                                top: '5px', 
                                right: '5px',
                            }}
                            onClick={() => setShow(false)}
                        ><CloseIcon/></IconButton>
                        <TextField value={input}
                            variant='standard'
                            label='Search'
                            onInput={e => setInput(e.target.value)}
                            className={classes.search}
                            inputProps={{ 
                                sx: { fontSize: '2em' }
                            }}
                            InputLabelProps={{
                                sx: { fontSize: '1.5em' },
                            }}
                        />
                    </Paper>
                </Slide>
            </Modal>
        </Backdrop>
    )
}

export default SearchBar