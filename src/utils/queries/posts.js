import connectMongo from "../connectMongo";
import Category from "../../models/category";
import Author from "../../models/author";
import Post from "../../models/post";


export const getAllPosts = async () => {
    
    await connectMongo()

    const results = await Post.find().populate('author').lean()
    
    const posts = JSON.parse(JSON.stringify(results))
    return posts;
}

export const getPostBySlug = async (slug) => {

    await connectMongo()
    
    const result = await Post
        .findOne({ slug })
        .lean()
        .populate({ 
            path: 'author',
            populate: { 
                path: 'posts',
                match: { slug: { $ne: slug } },
                select: 'title slug category thumbnail createdAt',
                options: { limit: 3 },
            }
        })
        .populate({ path: 'category', select: 'title slug' })

    const post = JSON.parse(JSON.stringify(result))
    return post;
}

export const getPostsByCategory = async (slug) => {

    await connectMongo()

    const category = await Category.findOne({ slug })
    const results = await Post
        .find({ category: category._id })
        .lean()
        .populate('author category')
        .sort('-createdAt')

    const posts = JSON.parse(JSON.stringify(results))
    return posts;
}
