import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'

export default async function handler(req, res){

    const { slug } = req.query;

    await connectMongo()

    const post = await Post.findOne({ slug })
        .populate({
            path: 'comments',
            populate: {
                path: 'replies'
            }
        })
        .select('comments commentCount -_id')
    
    return res.status(200).json(post)
}
