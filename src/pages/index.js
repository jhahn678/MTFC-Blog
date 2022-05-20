import Button from '@mui/material/Button'
import { useAuthContext } from '../store/context/auth'
import { axios } from '../utils/axios'
import PostSlider from '../components/shared/PostSlider/PostSlider'

const HomePage = ({ posts }) => {

  const { authStatus, resetAuthStatus } = useAuthContext()

  console.log(posts)

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

export async function getStaticProps(){
  const res = await axios.get('/post')
  return{
    props: { posts: res.data }
  }
}
