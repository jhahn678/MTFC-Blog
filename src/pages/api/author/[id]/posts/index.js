import connectMongo from '../../../../../utils/connectMongo'
import Author from '../../../../../models/author'

export default async function handler(req, res){

    const { id, limit=6, page=1 } = req.query;

    await connectMongo()

    const author = await Author.findById(id)
        .populate({
            path: 'posts',
            select: '-comments -author',
            options: { limit: limit, skip: ( limit * ( page - 1 )), sort: '-createdAt' }
        })
        .select('posts -_id')

    res.status(200).json(author)
}