import { useRegisterMutation } from '../../store/api'
import { useAuthContext } from '../../store/context/auth'

const useRegisterUser = ({ onSuccess, onError }) => {

    const [ register ] = useRegisterMutation()
    const { setAuthStatus } = useAuthContext()

    const registerUser = async (name, email, password) => {
        try{
            const { user } = await register({
                name: form.name.value,
                email: form.email.value,
                password: form.password.value
            }).unwrap()
            localStorage.setItem('USER_ID', user._id)
            setAuthStatus({
                isAuthenticated: true,
                user
            })
            toast.success('Successfully created account')
            onSuccess && onSuccess()
        }catch(err){
            toast.error(err.message)
        }
    }
    
    
    return {
        registerUser
    }

}

export default useRegisterUser