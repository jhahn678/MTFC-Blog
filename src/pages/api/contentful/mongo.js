import { createClient } from "contentful";
import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Category from '../../../models/category'
import Author from '../../../models/author'

export default async function handler(req, res){
    
    await connectMongo()
    
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    })

    const { items } = await client.getEntries({
        content_type: 'post',
        include: 10
    })

    let posts = [];

    for(let item of items){
        const foundPost = await Post.findOne({ entry_id: item.sys.id })
        if(!foundPost){

            const author = await Author.findOne({ entry_id: item.fields.author.sys.id })

            const category = await Category.findOne({ entry_id: item.fields.category.sys.id })

            const newPost = new Post({
                entry_id: item.sys.id,
                title: item.fields.title,
                slug: item.fields.slug,
                category: category._id,
                thumbnail: `https:${item.fields.thumbnail.fields.file.url}`,
                preview: item.fields.preview,
                tags: item.fields.tags,
                author: author._id,
            })

            const post = await newPost.save()

            posts.push(post)
        }
    }

    res.status(200).json({ posts })
}