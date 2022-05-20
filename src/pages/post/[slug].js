import { createClient } from 'contentful'

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
        'fields.slug': params.slug,
        include: 10
    })
    return { 
        props: { post: items[0] }
    }
}

const Post = ({ post }) => {
    return(
        <h1>{post.fields.title}</h1>
    )
}

export default Post;