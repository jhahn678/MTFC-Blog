import classes from './Category.module.css'
import { axios } from '../../utils/axios'
import PostList from '../../components/shared/PostList'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import Divider from '@mui/material/Divider'
import CategoryCard from '../../components/shared/CategoryCard'
import TextHover from '../../components/shared/TextHover'
import Head from 'next/head'

export async function getStaticPaths(){
    const { data } = await axios.get('/category')
    const paths = data.map(c => ({
        params: { slug: c.slug }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }){
    const { data: posts } = await axios.get(`/post/category/${params.slug}`)
    const { data: category } = await axios.get(`/category/${params.slug}`)
    const { data: allCategories } = await axios.get('/category')

    const categories = allCategories.filter(c => c.slug !== params.slug)

    return{
        props: { category, categories, posts },
        revalidate: ( 60 * 60 * 24 )
    }
}

const Category = ({ category, categories, posts }) => {
    
    return (
        <>
        <Head>
            <title>{category.title} | Category | MTFC Blog</title>
            <meta name='description' content={category.description}/>
        </Head>
        <div className={classes.page}>
            <header>
                <TextHover>
                    <h1 className={classes.title}>{category.title}</h1>
                </TextHover>
            </header>
            <main className={classes.main}>
                <PostList containerClass={classes.postList} posts={posts} postClass={classes.post}/>
                <aside className={classes.aside}>
                    <h3 className={classes.categoryHeader}>{category.title}
                        <span style={{ fontSize: '.8em'}}>{posts.length} post(s)</span>
                    </h3>
                    <Paper className={classes.imageContainer}>
                        <Image src={category.thumbnail} alt={category.title} layout='fill' objectFit='cover'/>
                    </Paper>
                    <p className={classes.description}>
                        <strong style={{ marginRight: 10}}>Description:</strong>
                        {category.description}
                    </p>
                    <Divider sx={{ margin: '1em 0'}}/>
                    <h3 className={classes.categoryHeader}>Other Categories</h3>
                    { categories.map(c => <CategoryCard key={c._id} containerClass={classes.categoryCard} category={c}/>) }
                </aside>
            </main>
        </div>
        </>
    )
}

export default Category