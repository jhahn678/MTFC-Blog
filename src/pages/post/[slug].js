import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types'
import { useState, useRef, useEffect } from 'react'
import classes from './Post.module.css'
import { axios } from '../../utils/axios'
import Link from 'next/link'
import Chip from '@mui/material/Chip'
import Image from 'next/image'
import { formatDate, formatDateAuthor } from '../../utils/formatDate';
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Comment from '../../components/shared/Comment/Comment'
import { useAuthContext } from '../../store/context/auth';
import { useCreateCommentMutation, useBookmarkPostMutation, useFollowAuthorMutation } from '../../store/api';
import { toast } from 'react-toastify'
import LoginIcon from '@mui/icons-material/Login';

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
    const res = await axios.get(`/post/${params.slug}`)
    const post = { ...res.data, body: items[0].fields.body}
    return { 
        props: { post }
    }
}

const opts = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { file, title } = node.data.target.fields;
          return <img src={`https:${file.url}`} alt={title}/>
        }
    }
}



const Post = ({ post }) => {

    const { authStatus, setBookmarks, setFollowing } = useAuthContext()

    const [ createComment, { data: newComment, isLoading, isError} ] = useCreateCommentMutation()
    const [ bookmarkPost ] = useBookmarkPostMutation()
    const [ followAuthor ] = useFollowAuthorMutation()

    const commentRef = useRef()

    const [isFollowed, setIsFollowed] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    useEffect(() => {
        if(authStatus?.user?.bookmarks?.includes(post._id)){
            setIsBookmarked(true)
        }
        if(authStatus?.user?.following?.includes(post.author._id)){
            setIsFollowed(true)
        }
    },[authStatus.user])

    const handleComment = async () => {
        if(commentRef.current.value.length > 0){
            try{
                const res = await createComment({ postId: post._id, body: commentRef.current.value}).unwrap()
                toast.success('Comment sent')
                commentRef.current.value = ''
            }catch(err){
                toast.error(err)
            }
        }
    }

    const handleBookmark = async () => {
        setIsBookmarked(f => !f)
        const res = await bookmarkPost(post._id).unwrap()
        setBookmarks(res.user.bookmarks)
    }  

    const handleFollow = async () => {
        setIsFollowed(f => !f)
        const res = await followAuthor(post.author._id).unwrap()
        setFollowing(res.user.following)
    }

    return(
        <div className={classes.page}>
            <section className={classes.titleHeading}>
                <div>
                    <p className={classes.date}>{formatDate(post.createdAt)}</p>
                    <h1 className={classes.title}>{post.title}</h1>
                    <Chip label={post.category.title} clickable={true} sx={{ marginBottom: '2vh', fontSize: '1em'}}/>
                </div>
                <div className={classes.authorGroup}>
                    <Link href={`/author/${post.author._id}`}>
                        <h3 className={classes.authorLink}>
                            <Avatar src={post.author.avatar} alt={post.author.displayName} 
                                sx={{ height: '50px', width: '50px', marginRight: '8px'}}
                            />
                            {post.author.displayName}
                        </h3>
                    </Link>
                    <Button 
                        startIcon={ isFollowed ? <CheckCircleIcon color='success'/> : <AddIcon/>}
                        onClick={handleFollow}
                    >{isFollowed ? 'Unfollow' : 'Follow' }</Button>
                    <Button 
                        startIcon={ isBookmarked ? <BookmarkAddedIcon color='success'/> : <BookmarkAddIcon/>}
                        onClick={handleBookmark}
                    >{isBookmarked ? 'Unbookmark' : 'Bookmark' }</Button>
                </div>
            </section>
            <main className={classes.main}>
                <section className={classes.post}>
                    <div className={classes.imageContainer}>
                        <Image src={post.thumbnail} alt={post.title} layout='fill' objectFit='cover'/>
                    </div>
                    <article className={classes.body}>
                        { documentToReactComponents(post.body, opts) }
                    </article>
                </section>
                <aside className={classes.sideContent}>
                    <Card sx={{ padding: 2 }}>
                        <h3 style={{ marginLeft: 10 }}>About the Author</h3>
                        <Divider sx={{ marginBottom: 3 }}/>
                        <p style={{ marginLeft: 10 }}><b style={{ marginRight: 10 }}>Author since:</b> {formatDateAuthor(post.author.createdAt)}</p>
                        <p style={{ marginLeft: 10 }}><b style={{ marginRight: 10 }}>Location:</b> {post.author.location}</p>
                        <p style={{ marginLeft: 10 }}><b style={{ marginRight: 10 }}>Bio:</b> {post.author.bio}</p>
                    </Card>
                    <Card className={classes.commentSection}>
                        <h3 className={classes.commentHeader}>Comments ({post.commentCount})</h3>
                        { post.comments.length > 0 && post.comments.map(c => <Comment key={c._id} comment={c}/>) }
                        { authStatus.isAuthenticated ? 
                            <TextField multiline={true}
                                maxRows={3}
                                label='Leave a comment'
                                inputRef={commentRef}
                                InputProps={{
                                    endAdornment: 
                                        <IconButton sx={{ padding: 0 }} onClick={handleComment}>
                                            <SendIcon/>
                                        </IconButton>
                                }}
                                sx={{ marginBottom: 1, marginTop: 1 }}
                            /> : 
                            <Button variant='contained' 
                                endIcon={<LoginIcon/>}
                                onClick={() => {}}
                            >
                                Sign in to leave a comment
                            </Button>
                        }  
                    </Card>
                </aside>
            </main>
        </div>
    )
}

export default Post;