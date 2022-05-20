import { createClient } from  'contentful'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export async function getStaticPaths(){
    const { items } = await client.getEntries({ content_type: 'author' })
    const paths = items.map(a => ({
        params: { id: a.sys.id }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }){
    const author = await client.getEntry(params.id)
    return{
        props: { author }
    }
}

const Author = ({ author }) => {

    return(
        <h1>{author.fields.displayName}</h1>
    )
}

export default Author;