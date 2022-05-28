import { axios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import classes from './Author.module.css'
import { useLazyGetAuthorPostsQuery } from '../../store/api'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

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

    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({ next: false, page: 1 })
    const [ getPosts, { isLoading } ] = useLazyGetAuthorPostsQuery()

    useEffect(() => {
        setPosts(author.posts)
        if(author.posts.length === 8){
            setPagination({
                next: true,
                page: 1
            })
        }
    },[])

    const loadPosts = async (page=1, limit=8) => {
        try{
            const res = await getPosts({ id: author._id, page, limit }).unwrap()
            setPosts((state) => {
                return state.concat(res.posts)
            })
            setPagination({
                next: res.posts.length === limit,
                page: page
            })
        }catch(err){
            toast.error(err)
        }
    }

    return(
        <main className={classes.page}>
            <h1 className={classes.name}>{author.displayName}</h1>
            { posts.map(p => (
                <p key={p._id}>{p.title}</p>
            ))
            }
            { pagination.next &&
                <Button variant='outlined' 
                    sx={{ padding: '1.5em 4em', alignSelf: 'center'}}
                    onClick={() => loadPosts(pagination.page + 1)}
                >Load more</Button>
            }
        </main>
    )
}

export default Author;