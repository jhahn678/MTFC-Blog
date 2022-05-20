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
import { useRegisterMutation } from '../../../store/api'
import { toast } from 'react-toastify'


const RegisterModal = ({ open, setOpen }) => {

    const [form, dispatch] = useReducer(reducer, initialState)

    const [visible, setVisible] = useState(false)

    const [ register ] = useRegisterMutation()

    useEffect(() => {
        if(form.name.valid, form.email.valid && form.password.valid && form.confirm.valid){
            dispatch({ type: 'FORM' })
        }
    },[form.name.valid, form.email.valid, form.password.valid, form.confirm.valid])

    const handleRegister = async () => {
        try{
            const res = await register({
                name: form.name.value,
                email: form.email.value,
                password: form.password.value
            }).unwrap()
            localStorage.setItem('USER_ID', res.user._id)
            setAuthStatus({
                isAuthenticated: true,
                user: res.user,
            })
            setOpen(false)
            dispatch({ type: 'SUCCESS' })
            toast.success('Successfully created account')
        }catch(err){
            toast.error(err.message)
        }
    }   

    return(
        <FadeModal open={open} setOpen={setOpen}>
            <Paper className={classes.registerModal}>
                <h2 className={classes.title}>Get Started</h2>
                <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1}}>
                    <CloseIcon/>
                </IconButton>
                <motion.div className={classes.modalTop}/>
                <form className={classes.form}>
                    <Logo className={classes.logo}/>
                    <TextField className={classes.input}
                        label='Name' value={form.name.value}
                        onInput={e => dispatch({ type: 'NAME', value: e.target.value})} 
                        error={form.name.touched && !form.name.valid} 
                        helperText={form.name.message}
                    />
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
                    <Button variant='outlined' 
                        size='large' 
                        sx={{ 
                            width: '100%',
                            marginTop: '1vh'
                        }}
                        onClick={handleRegister}
                        disabled={!form.form.valid}
                    >Get Started</Button>
                    <div className={classes.flex}><span className={classes.line}/><p>OR</p><span className={classes.line}/></div>
                    <Button variant='outlined' 
                        size='large'
                        endIcon={<GoogleIcon/>} 
                        sx={{ width: '100%', marginTop: '1vh'}}
                        disabled={true}
                    >Sign in with Google</Button>
                </form>
            </Paper>
        </FadeModal>
    )
}

export default RegisterModal;