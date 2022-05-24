import { axios } from '../../utils/axios'

export async function getStaticPaths(){
    const { data } = await axios.get('/author')
    const paths = data.map(a => ({
        params: { id: a._id }
    }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }){
    const { data: author } = await axios.get(`/author/${params.id}`)
    return{
        props: { author }
    }
}

const Author = ({ author }) => {

    return(
        <h1>{author.displayName}</h1>
    )
}

export default Author;