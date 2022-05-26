import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import classes from './Post.module.css'
import { axios } from '../../utils/axios'
import CategoryChip from '../../components/shared/buttons/CategoryChip'
import Image from 'next/image'
import { formatDate, formatDateAuthor } from '../../utils/formatDate';
import Card from '@mui/material/Card'
import AuthorAvatar from '../../components/shared/AuthorAvatar/AuthorAvatar'
import Divider from '@mui/material/Divider'
import RelatedPosts from '../../components/shared/RelatedPosts/RelatedPosts'
import FollowButton from '../../components/shared/buttons/FollowButton'
import BookmarkButton from '../../components/shared/buttons/BookmarkButton'
import CommentSection from '../../components/shared/Comment/CommentSection'

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

    return(
        <div className={classes.page}>
            <section className={classes.titleHeading}>
                <div>
                    <p className={classes.date}>{formatDate(post.createdAt)}</p>
                    <h1 className={classes.title}>{post.title}</h1>
                    <CategoryChip title={post.category.title} slug={post.category.slug}/>
                </div>
                <div className={classes.authorGroup}>
                    <AuthorAvatar author={post.author}/>
                    <FollowButton author={post.author}/>
                    <BookmarkButton post={post}/>
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
                    <Card className={classes.relatedPostsCard}>
                        <h3>Other posts from this author</h3>
                        <Divider sx={{ marginBottom: 3 }}/>
                        <RelatedPosts 
                            containerClass={classes.relatedPosts}
                            postClass={classes.relatedPost}
                            posts={post.author.posts.filter(p => p._id !== post._id)}
                            author={post.author}
                        />
                    </Card>
                    <CommentSection 
                        post={post}
                        cardClass={classes.commentSection}
                    />
                </aside>
            </main>
        </div>
    )
}

export default Post;