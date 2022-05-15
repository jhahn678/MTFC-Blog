import { createClient } from 'contentful'
import Layout from '../../components/layout/Layout'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getStaticPaths(){
    const { items } = await client.getEntries({ content_type: 'post' })
    const paths = items.map(p => ({
        params: { slug: p.fields.slug }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }){
    const { items } = await client.getEntries({
        content_type: 'post',
        'fields.slug': params.slug
    })
    return { 
        props: { post: items[0] }
    }
}

const Post = ({ post }) => {
    return(
        <Layout>
            <h1>{post.fields.title}</h1>
        </Layout>
    )
}

export default Post;