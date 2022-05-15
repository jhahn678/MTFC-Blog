import UnstyledButton from '@mui/material/Button'
import { styled } from '@mui/material'

const Button = styled(UnstyledButton)(({ theme }) => ({
    borderRadius: '20px'
}))

export default Button;