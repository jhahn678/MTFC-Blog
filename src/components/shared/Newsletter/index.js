import classes from './Newsletter.module.css'
import { useState } from 'react'
import { emailSchema } from '../../../utils/validation'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import TextHover from '../TextHover'
import { toast } from 'react-toastify'


const Newsletter = ({ containerClass }) => {

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid]= useState(false)

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
        const { error } = emailSchema.validate(email)
        if(error){
            setEmailValid(false)
        }else{
            setEmailValid(true)
        }
    }

    const handleSignUp = () => {
        setEmail('')
        toast.success('Email added to newsletter')
    }
    

    return (
        <section className={containerClass}>
            <div className={classes.header}>
                <TextHover><h3>Stay up-to-date</h3></TextHover>
            </div>
            <TextField label='Email' variant='filled'
                color={emailValid ? 'success' : null}
                InputProps={{ sx: { fontSize: '1.4em' },
                    endAdornment: 
                        <IconButton disabled={!emailValid} onClick={handleSignUp}>    
                            <SendIcon/>
                        </IconButton>
                }}
                InputLabelProps={{ sx: { paddingTop: .5 }}}
                sx={{ width: '100%' }}
                value={email} onInput={handleEmailInput}
            />
            <p className={classes.caption}>Receive weekly email updates about topics we think you'll find interesting</p>
        </section>
    )
}

export default Newsletter