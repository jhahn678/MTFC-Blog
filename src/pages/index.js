import classes from '../styles/home.module.css'
import { axios } from '../utils/axios'
import PostSlider from '../components/shared/PostSlider/PostSlider'
import CategoryCard from '../components/shared/CategoryCard'
import PostList from '../components/shared/PostList'
import Link from 'next/link'
import TextHover from '../components/shared/TextHover'
import Newsletter from '../components/shared/Newsletter'
import UserWidget from '../components/shared/UserWidget'
import Head from 'next/head'

export async function getStaticProps(){
  const { data: posts } = await axios.get('/post')
  const { data: categories } = await axios.get('/category')
  return{
    props: { posts, categories }
  }
}

const HomePage = ({ posts, categories }) => {

  return (
    <>
    <Head>
      <title>Home page | MTFC Blog</title>
    </Head>
    <main className={classes.page}>
      <h1 className={classes.header}>Recent Posts</h1>
      <PostSlider posts={posts.reverse().slice(0, 4)}/>
      <h1 className={classes.categoryHeader}>Categories</h1>
      <ul className={classes.categoriesSection}>
        { categories.map(c => <CategoryCard key={c._id} category={c} containerClass={classes.categoryContainer}/>) }
      </ul>
      {
        categories.map(c => 
          <section className={classes.postSection} key={c._id}>
            <h2 className={classes.latestInHeader}>
              <i style={{ marginRight: 10 }}>Latest in </i>
              <TextHover>
                <Link href={`/category/${c.slug}`}>
                    <p className={classes.linkHover}>{c.title}</p>
                </Link>
              </TextHover>
            </h2>
            <PostList posts={posts.filter(p => p.category._id === c._id).slice(0, 2)} 
              containerClass={classes.postContainer}
              postClass={classes.post}
            />
          </section>
        )
      }
      <section className={classes.bottomSection}>
        <Newsletter containerClass={classes.newsletterContainer}/>
        <div className={classes.divider}/>
        <UserWidget containerClass={classes.userWidgetContainer}/>
      </section>
      
    </main>
    </>
  )
}

export default HomePage
