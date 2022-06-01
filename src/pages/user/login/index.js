import { useEffect, useRef, useState } from 'react'
import classes from './index.module.css'
import { useAuthContext } from '../../../store/context/auth'
import { useModalContent, useModalContext } from '../../../store/context/modal'
import { useRouter } from 'next/router'
import useGoogleAuth from '../../../utils/hooks/useGoogleAuth'
import useLoginUser from '../../../utils/hooks/useLoginUser'
import useRegisterUser from '../../../utils/hooks/useRegisterUser'
import { motion } from 'framer-motion'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import GoogleIcon from '../../../assets/GoogleIcon'


const UserLogin = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    const router = useRouter()
    const { authStatus } = useAuthContext()
    const { setShowRegister } = useModalContext()

    const { signInWithGoogle } = useGoogleAuth({ onSuccess: () => router.push('/user') })
    const { loginUser } = useLoginUser({ onSuccess: () => router.push('/user') })

    useEffect(() => {
        if(authStatus.isAuthenticated){
            router.push('/user')
        }
    },[authStatus.isAuthenticated])

    return (
        <div className={classes.page}>
            <Paper className={classes.container}>
                <img src='https://storage.googleapis.com/mtfc-products/MTFC-images/fish-background.png' alt='fish background' className={classes.background}/>
                <motion.form className={classes.form}>
                    <h2>Sign in</h2>
                    <TextField className={classes.input} 
                        variant='filled'
                        label='Email'
                        inputRef={emailRef}
                        sx={{ marginBottom: '1em', marginTop: '5%'}}
                    />
                    <TextField variant='filled'
                        className={classes.input} 
                        label='Password'
                        inputRef={passwordRef}
                        sx={{ marginBottom: '2em'}}
                    />
                    <Button variant='contained' 
                        size='large' 
                        sx={{ width: '100%', margin: 0 }}
                        onClick={() => loginUser(emailRef.current.value, passwordRef.current.value)}
                    >Sign in</Button>
                    <div className='frac asc'><span className={classes.line}/><p style={{ margin: '.5em 0'}}>OR</p><span className={classes.line}/></div>
                    <Button variant='contained' 
                        size='large'
                        endIcon={<GoogleIcon/>} 
                        sx={{ width: '100%' }}
                        disabled={false}
                        onClick={() => signInWithGoogle()}
                    >Sign in with Google</Button>
                    <p className='asfe' style={{ marginBottom: 0}}>New around here? <Button onClick={() => setShowRegister(true)}>Sign up</Button></p>
                </motion.form>
                <div className={classes.prompt}>
                    <h3 className={classes.header}>Don't have an account?</h3>
                    <p className={classes.text}>Create an account for a more <i>personalized </i>
                     experience. Bookmark posts, follow authors, leave comments and more.</p>
                </div>
            </Paper>
        </div>
    )
}

export default UserLogin