import connectMongo from '../../../utils/connectMongo'
import Author from '../../../models/author'

export default async function handler(req, res){

    const { limit=8, page=1 } = req.query;

    await connectMongo()

    const authors = await Author.find()
        .populate({
            path: 'posts',
            select: '-comments -author',
            options: { limit: 2 }
        })
        .limit(limit)
        .skip(limit * ( page - 1 ) )

    res.status(200).json(authors)
}