import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import { motion } from 'framer-motion'
import FadeModal from '../modals/FadeModal'
import classes from './LoginModal.module.css'
import Button from '../buttons/Button'
import Logo from '../../layout/Header/Logo/Logo'
import GoogleIcon from '../../../assets/GoogleIcon'
import { useRef } from 'react'
import useGoogleAuth from '../../../utils/hooks/useGoogleAuth'
import useLoginUser from '../../../utils/hooks/useLoginUser'
import { useModalContext } from '../../../store/context/modal'

const LoginModal = ({ open, setOpen }) => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { setShowLogin, setShowRegister } = useModalContext()

    const { signInWithGoogle } = useGoogleAuth({ onSuccess: () => setOpen(false)})
    
    const { loginUser } = useLoginUser({ onSuccess: () => {
        setOpen(false);
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }})

    const handleSignUp = () => {
        setShowLogin(false)
        setShowRegister(true)
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
                        onClick={() => loginUser(emailRef.current.value, passwordRef.current.value)}
                    >Sign in</Button>
                    <div className={classes.flex}><span className={classes.line}/><p>OR</p><span className={classes.line}/></div>
                    <Button variant='outlined' 
                        size='large'
                        endIcon={<GoogleIcon/>} 
                        sx={{ width: '100%', marginTop: '1vh'}}
                        disabled={false}
                        onClick={() => signInWithGoogle()}
                    >Sign in with Google</Button>
                    <p>New around here? <Button onClick={handleSignUp}>Sign up</Button></p>
                </form>
            </Paper>
        </FadeModal>
    )
}

export default LoginModal;
