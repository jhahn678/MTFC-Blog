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
import PostResult from './results/Post'
import AuthorResult from './results/Author'
import CategoryResult from './results/Category'
import CircularProgress from '@mui/material/CircularProgress'
import { motion } from 'framer-motion'


const SearchBar = ({ show, setShow }) => {  

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const [noResults, setNoResults] = useState(false)
    const [ search, { isLoading } ] = useLazySearchAllQuery()

    const getSearchResults = async (value) => {
        const res = await search(value).unwrap()
        if(res.length === 0){
            setNoResults(true)
        }else{
            setNoResults(false)
            setResults(res)
        }
    }

    useEffect(() => {
        if(input.length < 2){
            setResults([])
            setNoResults(false)
        }
        else if(input.length > 2){
            const timer = setTimeout(() => {
                getSearchResults(input)
            }, 500)
        }

        return () => clearTimeout(timer)
    },[input])


    const closeSearch = () => {
        setInput('')
        setResults([])
        setShow(false)
    }


    return (
        <Backdrop open={show}>
            <Modal open={show} onClose={closeSearch}>
                <Slide direction='down' in={show} unmountOnExit>
                    <Paper className={classes.modal}>
                        <IconButton className={classes.close} 
                            sx={{ 
                                position: 'absolute',
                                top: '5px', 
                                right: '5px',
                            }}
                            onClick={closeSearch}
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
                        <ul className={classes.resultsContainer}>
                            { isLoading && <CircularProgress color='secondary' size={100} thickness={2} sx={{ alignSelf: 'center', marginTop: '20vh'}} /> }
                            { noResults && 
                                <motion.h1 className={classes.noResults} 
                                    initial={{ y: -300}} 
                                    animate={{ y: 0, 
                                    transition: { type: 'spring', duration: .5} 
                                    }}
                                >No results found</motion.h1>}
                            { 
                                results.map(r => {
                                    switch(r.resource_type){
                                        case 'POST':
                                            return <PostResult key={r._id} data={r}/>
                                        case 'AUTHOR':
                                            return <AuthorResult key={r._id} data={r}/>
                                        case 'CATEGORY':
                                            return <CategoryResult key={r._id} data={r}/>
                                        default:
                                            break;
                                    }
                                })   
                            }
                        </ul>
                    </Paper>
                </Slide>
            </Modal>
        </Backdrop>
    )
}

export default SearchBar

