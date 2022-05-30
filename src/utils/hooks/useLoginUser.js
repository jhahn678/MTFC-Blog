import { toast } from 'react-toastify'
import { useLoginMutation } from '../../store/api'
import { useAuthContext } from '../../store/context/auth'

const useLoginUser = ({ onSuccess, onError }) => {

    const [ login ] = useLoginMutation()
    const { setAuthStatus } = useAuthContext()

    const loginUser = async (email, password) => {
        try{
            const { user } = await login({ email, password }).unwrap()
            console.log(user)
            localStorage.setItem('USER_ID', user._id)
            setAuthStatus({
                isAuthenticated: true,
                user
            })
            onSuccess && onSuccess()
        }catch(err){
            toast.error('Invalid credentials')
            onError && onError()
        }
    }
  
    return { loginUser }
}

export default useLoginUser