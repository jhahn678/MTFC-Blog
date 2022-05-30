import { useGoogleLogin } from '@react-oauth/google'
import { useAuthContext } from '../../store/context/auth'
import { useGoogleAuthMutation } from '../../store/api'
import { toast } from 'react-toastify'


const useGoogleAuth = ({ onSuccess, onError }) => {

    const [ googleSignIn ] = useGoogleAuthMutation()

    const { setAuthStatus } = useAuthContext()

    const signInWithGoogle = useGoogleLogin({
        onSuccess: async (res) => {
            try{
                const { user } = await googleSignIn(res.access_token).unwrap()
                setAuthStatus({
                    isAuthenticated: true,
                    user
                })
                localStorage.setItem('USER_ID', user._id)
                toast.success('Signed in with Google!')
                onSuccess && onSuccess()
            }catch(err){
                toast.error('Failure signing in with Google')
                onError && onError()
            }
        },
        onError: err => {
            toast.error('Could not connect to Google')
            console.log(err)
        },
    })

    return { signInWithGoogle }
}

export default useGoogleAuth;