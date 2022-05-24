import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'

export default async function handler(req, res){

    const { slug, select } = req.query;

    await connectMongo()

    if(select === 'comments'){
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

    const post = await Post.findOne({ slug })
    .populate({ 
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
    .populate({ path: 'comments', populate: { path: 'replies' } })

    res.status(200).json(post)
}