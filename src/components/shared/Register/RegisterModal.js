import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import FadeModal from '../modals/FadeModal'
import classes from './RegisterModal.module.css'
import Button from '../buttons/Button'
import Logo from '../../layout/Header/Logo/Logo'
import GoogleIcon from '../../../assets/icons/GoogleIcon'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { initialState, reducer } from './formReducer'
import { useEffect, useReducer, useState } from 'react'


const RegisterModal = ({ open, setOpen }) => {

    const [form, dispatch] = useReducer(reducer, initialState)

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(form.email.valid && form.password.valid && form.confirm.valid){
            dispatch({ type: 'FORM' })
        }
    },[form.email.valid, form.password.valid, form.confirm.valid])

    return(
        <FadeModal open={open} setOpen={setOpen}>
            <Paper className={classes.registerModal}>
                <h2 className={classes.title}>Get Started</h2>
                <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 0, zIndex: 1}}>
                    <CloseIcon/>
                </IconButton>
                <motion.div className={classes.modalTop}/>
                <form className={classes.form}>
                    <Logo className={classes.logo}/>
                    <TextField className={classes.input}
                        label='Email' value={form.email.value}
                        onInput={e => dispatch({ type: 'EMAIL', value: e.target.value})} 
                        error={form.email.touched && !form.email.valid} 
                        helperText={form.email.message}
                    />
                    <TextField className={classes.input}
                        label='Password' value={form.password.value}
                        onInput={e => dispatch({ type: 'PASSWORD', value: e.target.value})}
                        error={form.password.touched && !form.password.valid} 
                        helperText={form.password.message}
                        type={ visible ? 'text' : 'password' }
                        InputProps={{
                            endAdornment: 
                                <IconButton onClick={() => setVisible(v => !v)}>
                                    {visible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                        }}
                    
                    />
                    <TextField className={classes.input}
                        label='Confirm Password' value={form.confirm.value} 
                        onInput={e => dispatch({ type: 'CONFIRM', value: e.target.value})} 
                        error={form.confirm.touched && !form.confirm.valid} 
                        helperText={form.confirm.message}
                        type={ visible ? 'text' : 'password' }
                        InputProps={{
                            endAdornment: 
                                <IconButton onClick={() => setVisible(v => !v)}>
                                    {visible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                        }}
                    />
                    <Button variant='outlined' size='large' sx={{ width: '100%', marginTop: '1vh'}}>Get Started</Button>
                    <div className={classes.flex}><span className={classes.line}/><p>OR</p><span className={classes.line}/></div>
                    <Button variant='outlined' 
                        size='large'
                        endIcon={<GoogleIcon/>} 
                        sx={{ width: '100%', marginTop: '1vh'}}
                    >Sign in with Google</Button>
                </form>
            </Paper>
        </FadeModal>
    )
}

export default RegisterModal;