import connectMongo from '../../../utils/connectMongo'
import Author from '../../../models/author'

export default async function handler(req, res){

    const { id } = req.query;

    await connectMongo()

    const author = await Author.findById(id).populate({
        path: 'posts',
        select: '-comments -author',
        populate: {
            path: 'category',
            select: 'title slug'
        }
    })
    .populate({
        path: 'comments',
        select: '-replies',
        populate: {
            path: 'Post',
            select: 'slug Title'
        }
    })

    res.status(200).json(author)
}