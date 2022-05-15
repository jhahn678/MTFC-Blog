import Header from '../components/layout/Header/Header'
import { createClient } from 'contentful'
import { TypePost } from '../types/contentful'

type Props = {
  posts: [TypePost]
}

// export async function getStaticProps(){
//   const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
//   })
//   const data = await client.getEntries({ content_type: 'post'})
//   return{
//     props: {
//       posts: data.items
//     }
//   }
// }

const HomePage = ({ posts }: Props) => {

  // console.log(posts)
  return (
    <div className='h-screen w-screen'>
      <Header/>
    </div>
  )
}

export default HomePage
