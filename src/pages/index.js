import classes from '../styles/home.module.css'
import { useAuthContext } from '../store/context/auth'
import { axios } from '../utils/axios'
import PostSlider from '../components/shared/PostSlider/PostSlider'
import CategoryCard from '../components/shared/CategoryCard'
import PostList from '../components/shared/PostList'
import Link from 'next/link'
import TextHover from '../components/shared/TextHover'

export async function getStaticProps(){
  const { data: posts } = await axios.get('/post')
  const { data: categories } = await axios.get('/category')
  return{
    props: { posts, categories }
  }
}

const HomePage = ({ posts, categories }) => {

  const { authStatus, resetAuthStatus } = useAuthContext()

  return (
    <main className={classes.page}>
      <h1 className={classes.header}>Recent Posts</h1>
      <PostSlider posts={posts}/>
      <h1 className={classes.categoryHeader}>Categories</h1>
      <section className={classes.categoriesSection}>
        { categories.map(c => <CategoryCard key={c._id} category={c} containerClass={classes.categoryContainer}/>) }
      </section>
      {
        categories.map(c => 
          <section className={classes.postSection}>
            <h2 className={classes.latestInHeader}>
              <i style={{ marginRight: 10 }}>Latest in </i>
              <Link href={`/category/${c.slug}`}>
                <TextHover>
                  <p className={classes.linkHover}>{c.title}</p>
                </TextHover>
              </Link>
            </h2>
          </section>
        )
      }
    </main>
  )
}

export default HomePage
