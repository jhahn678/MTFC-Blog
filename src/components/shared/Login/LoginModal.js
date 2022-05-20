import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import FadeModal from '../modals/FadeModal'
import classes from './LoginModal.module.css'
import Button from '../buttons/Button'
import Logo from '../../layout/Header/Logo/Logo'
import GoogleIcon from '../../../assets/icons/GoogleIcon'
import { useRef } from 'react'
import { useLoginMutation, useGoogleAuthMutation } from '../../../store/api/index'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../../store/context/auth'

const LoginModal = ({ open, setOpen }) => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { setAuthStatus } = useAuthContext()

    const [ login ] = useLoginMutation()
    const [ googleAuth ] = useGoogleAuthMutation()

    const handleLogin = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const res = await login({ email, password }).unwrap()
        localStorage.setItem('USER_ID', res.user._id)
        setAuthStatus({
            isAuthenticated: true,
            user: res.user
        })
        setOpen(false)
        toast.success('Successfully signed in')
    }

    return(
        <FadeModal open={open} setOpen={setOpen}>
            <Paper className={classes.loginModal}>
                <h2 className={classes.title}>Sign In</h2>
                <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 0, zIndex: 1}}>
                    <CloseIcon/>
                </IconButton>
                <motion.div className={classes.modalTop}/>
                <form className={classes.form}>
                    <Logo className={classes.logo}/>
                    <TextField className={classes.input} 
                        label='Email'
                        inputRef={emailRef}
                    />
                    <TextField 
                        className={classes.input} 
                        label='Password'
                        inputRef={passwordRef}
                    />
                    <Button variant='outlined' 
                        size='large' 
                        sx={{ width: '100%', marginTop: '1vh'}}
                        onClick={handleLogin}
                    >Sign in</Button>
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

export default LoginModal;
