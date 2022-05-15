import Button from '../components/shared/buttons/Button'
import { useRouter } from 'next/router'

export default function NotFound(){

    const router = useRouter()

    return(
        <div className='notFoundPage'>
            <div className='notFoundContainer'>
                <h1 style={{ marginBottom: 0}}>Page Not Found</h1>
                <h3 style={{ marginBottom: 30}}>The page you requested does not exist</h3>
                <div className='notFoundButtonGroup'>
                    <Button variant='outlined' onClick={() => router.back()}>Take me back</Button>
                    <Button onClick={() => router.push('/')}>Home</Button>
                </div>
            </div>
        </div>
    )
}