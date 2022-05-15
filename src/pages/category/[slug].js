import { createClient } from 'contentful'
import Layout from '../../components/layout/Layout'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getStaticPaths(){
    const { items } = await client.getEntries({ content_type: 'category' })
    const paths = items.map(c => ({
        params: { slug: c.fields.slug }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }){
    const { items } = await client.getEntries({ 
        content_type: 'category',
        'fields.slug': params.slug
    })
    return{
        props: { category: items[0] }
    }
}

const Category = ({ category }) => {
    
    return (
        <Layout>
            <h1>{category.fields.title}</h1>
        </Layout>
    )
}

export default Category