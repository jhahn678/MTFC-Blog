import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import classes from './Post.module.css'
import CategoryChip from '../../components/shared/buttons/CategoryChip'
import Image from 'next/image'
import { formatDate, formatDateAuthor } from '../../utils/formatDate';
import Card from '@mui/material/Card'
import AuthorAvatar from '../../components/shared/AuthorAvatar/AuthorAvatar'
import Divider from '@mui/material/Divider'
import RelatedPosts from '../../components/shared/RelatedPosts/RelatedPosts'
import FollowButton from '../../components/shared/buttons/FollowButton'
import BookmarkButton from '../../components/shared/buttons/BookmarkButton'
import BookmarkIconButton from '../../components/shared/buttons/BookmarkIconButton'
import CommentSection from '../../components/shared/Comment/CommentSection'
import Head from 'next/head';
import AvatarChip from '../../components/shared/AvatarChip';
import useMediaQuery from '@mui/material/useMediaQuery'
import { getPostBySlug } from '../../utils/queries/posts'

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
    const data = await getPostBySlug(params.slug)
    const post = { ...data, body: items[0].fields.body}
    return { 
        props: { post },
        revalidate: ( 60 * 60 * 24 )
    }
}

const opts = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file, title } = node.data.target.fields;
            return(
                <div className={classes.imageContainer}>
                    <Image src={`https:${file.url}`} 
                        alt={title} 
                        layout='fill' 
                        objectFit='contain'
                    />
                </div>
            )
        }
    }
}



const Post = ({ post }) => {

    const breakpoint = useMediaQuery('(max-width: 1000px)')

    return(
        <>
        <Head>
            <title>{post.title} | MTFC Blog</title>
            <meta name='description' content={post.preview.split(' ').slice(0,30).join(' ').concat('...')}/>
        </Head>
        <div className={classes.page}>
            <section className={classes.titleHeading}>
                <div>
                    <div className='frsb'>
                        <p className={classes.date}>{formatDate(post.createdAt)}</p>
                        { breakpoint && <BookmarkIconButton post={post} styles={{ margin: 0, padding: 0 }}/> }
                    </div>
                    <h1 className={classes.title}>{post.title}</h1>
                    <div className='frsb'>
                        <CategoryChip title={post.category.title} slug={post.category.slug} styles={{ margin: 0, fontSize: breakpoint ? '.8em' : '1em'}}/>
                        { breakpoint && 
                            <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent: 'flex-end'}}>
                                <AvatarChip author={post.author} styles={{ margin: 0, fontSize: '.8em' }}/>
                                <FollowButton author={post.author} buttonProps={{ size:'small' }}/>
                            </div> 
                        }
                    </div>
                </div>
                <div className={classes.authorGroup}>
                    { !breakpoint && 
                        <>
                        <AuthorAvatar author={post.author}/>
                        <FollowButton author={post.author}/>
                        <BookmarkButton post={post}/>
                        </>
                    }
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
        </>
    )
}

export default Post;