import connectMongo from '../../../../utils/connectMongo'
import mongoose from 'mongoose';
import Author from '../../../../models/author'

export default async function handler(req, res){

    const { id, page=1, limit=6 } = req.query;

    await connectMongo()

    const author = await Author.findById(id).populate({
        path: 'posts',
        select: '-comments -author',
        options: { limit: limit, skip: (limit * ( page - 1 )), sort: '-createdAt' }
    })

    res.status(200).json(author)
}