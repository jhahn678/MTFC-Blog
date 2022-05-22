import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Author from '../../../models/author'
import Category from '../../../models/category'

export default async function handler(req, res){

    const { slug } = req.query;

    await connectMongo()

    const post = await Post.findOne({ slug }).populate({ 
        path: 'author',
        populate: { 
            path: 'posts',
            select: 'title slug category thumbnail createdAt',
            options: { limit: 3 },
            populate: {
                path: 'category',
                select: 'title slug'
            }
        }
    })
    .populate({ path: 'category', select: 'title slug' })

    res.status(200).json(post)
}