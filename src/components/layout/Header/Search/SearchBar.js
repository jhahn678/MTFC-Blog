import Modal  from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Paper from '@mui/material/Paper'
import classes from './SearchBar.module.css'
import TextField from "@mui/material/TextField"
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useEffect } from "react"
import Slide from '@mui/material/Slide'
import { useLazySearchAllQuery } from "../../../../store/api"


const SearchBar = ({ show, setShow }) => {  

    const [input, setInput] = useState('')
    const [ search, { isLoading } ] = useLazySearchAllQuery()

    const getSearchResults = async (value) => {
        const res = await search(value).unwrap()
        console.log(res)
    }

    useEffect(() => {

        if(input.length > 2){
            const timer = setTimeout(() => {
                getSearchResults(input)
            }, 500)
        }
        return () => clearTimeout(timer)

    },[input])



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
                            autoFocus={true}
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

