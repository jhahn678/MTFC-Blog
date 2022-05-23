import Button from '@mui/material/Button'
import { useAuthContext } from '../store/context/auth'
import { axios } from '../utils/axios'
import PostSlider from '../components/shared/PostSlider/PostSlider'

export async function getStaticProps(){
  const res = await axios.get('/post')
  return{
    props: { posts: res.data }
  }
}

const HomePage = ({ posts }) => {

  const { authStatus, resetAuthStatus } = useAuthContext()

  return (
    <div>
      { authStatus.isAuthenticated && 
        <Button variant='contained' onClick={() => resetAuthStatus()}>Logout</Button>
      }
      <PostSlider posts={posts}/>
    </div>
  )
}

export default HomePage
