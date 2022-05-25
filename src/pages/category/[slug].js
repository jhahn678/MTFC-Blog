import classes from './Category.module.css'
import { axios } from '../../utils/axios'
import PostList from '../../components/shared/PostList'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import Divider from '@mui/material/Divider'
import CategoryCard from '../../components/shared/CategoryCard'

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
        props: { category, categories, posts}
    }
}

const Category = ({ category, categories, posts }) => {
    
    return (
        <div className={classes.page}>
            <header>
                <h1 className={classes.title}>{category.title}</h1>
            </header>
            <main className={classes.main}>
                <PostList containerClass={classes.postList} posts={posts}/>
                <aside className={classes.aside}>
                    <h3 className={classes.categoryHeader}>{category.title}
                        <span style={{ fontSize: '.8em'}}>{posts.length} post(s)</span>
                    </h3>
                    <Paper className={classes.imageContainer}>
                        <Image src={category.thumbnail} alt={`${category.title}`} layout='fill' objectFit='cover'/>
                    </Paper>
                    <p className={classes.description}>
                        <strong style={{ marginRight: 10}}>Description:</strong>
                        {category.description}
                    </p>
                    <Divider sx={{ margin: '1em 0'}}/>
                    <h3 className={classes.categoryHeader}>Other Categories</h3>
                    { categories.map(c => <CategoryCard containerClass={classes.categoryCard} category={c}/>) }
                </aside>
            </main>
        </div>
    )
}

export default Category