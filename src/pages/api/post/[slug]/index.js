import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'

export default async function handler(req, res){

    const { slug } = req.query;

    await connectMongo()

    const post = await Post.findOne({ slug })
    .populate({ 
        path: 'author',
        populate: { 
            path: 'posts',
            select: 'title slug category thumbnail createdAt',
            options: { limit: 3 },
        }
    })
    .populate({ path: 'comments', populate: { path: 'replies' } })

    res.status(200).json(post)
}