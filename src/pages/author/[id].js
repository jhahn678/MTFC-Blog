import { axios } from '../../utils/axios'
import { useState, useEffect } from 'react'
import classes from './Author.module.css'
import { useLazyGetAuthorPostsQuery } from '../../store/api'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import PostList from '../../components/shared/PostList'
import { formatDateAuthor } from '../../utils/formatDate'
import FollowButton from '../../components/shared/buttons/FollowButton'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';

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
        if(author.posts.length === 6){
            setPagination({
                next: true,
                page: 1
            })
        }
    },[])

    const loadPosts = async (page=1, limit=6) => {
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

    const redirect = (url) => {
        window.location.href(url)
    }

    return(
        <main className={classes.page}>
            <section className={classes.authorPostsSection}>
                <h2 className={classes.latestPosts}>
                    Latest posts from <i>{author.displayName}</i>
                    <FollowButton author={author} styles={{ marginLeft: 3 }}/>
                </h2>
                <PostList posts={posts} author={author} containerClass={classes.postList} postClass={classes.post}/>
                { pagination.next &&
                    <Button variant='outlined' 
                        sx={{ width: '180px', height: '50px', alignSelf: 'center', margin: '2vh 0 5vh'}}
                        onClick={() => loadPosts(pagination.page + 1)}
                    >{ isLoading ? <CircularProgress size={30}/> : 'Load more'}</Button>
                }
            </section>
            <aside className={classes.authorAboutSection}>
                <div className='frac'>
                    <div className={classes.avatar}>
                        <img src={author.avatar} alt={author.displayName}/>
                    </div>
                    <div className='fc'>
                        <h2 className={classes.name}>{author.displayName}</h2>
                        <p className={classes.createdAt}>Author since <i>{formatDateAuthor(author.createdAt)}</i></p>
                    </div>
                </div>
                <div className='frsb' style={{ width: '12vw' }}>
                    { author.socials.facebook && 
                        <a href={`https://${author.socials.facebook}`} target="_blank">
                            <FacebookIcon className={classes.icon}/>
                        </a> 
                    }
                    { author.socials.instagram && 
                        <a href={`https://${author.socials.instagram}`} target="_blank">
                            <InstagramIcon className={classes.icon}/>
                        </a>
                    }
                    { author.socials.twitter && 
                        <a href={`https://${author.socials.twitter}`} target="_blank">
                            <TwitterIcon className={classes.icon}/>
                        </a>
                    }
                    { author.socials.website && 
                        <a href={`https://${author.socials.website}`} target="_blank">
                            <PublicIcon className={classes.icon}/>
                        </a>
                    }
                </div>
                <p className={classes.text}><i>Posts</i>{author.totalPosts}</p>
                <p className={classes.text}><i>Location</i>{author.location}</p>
                <p className={classes.text}><i>About</i>{author.bio}</p>
            </aside>
        </main>
    )
}

export default Author;