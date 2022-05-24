import classes from './Category.module.css'
import { axios } from '../../utils/axios'

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
    return{
        props: { category, posts}
    }
}

const Category = ({ category, posts }) => {

    console.log(category)
    
    return (
        <h1>{category.title}</h1>
    )
}

export default Category