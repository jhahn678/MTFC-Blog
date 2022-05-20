import connectMongo from '../../../utils/connectMongo'
import Author from '../../../models/author'

export default async function handler(req, res){

    const { id } = req.query;

    await connectMongo()

    const author = await Author.find(id)

    res.status(200).json(author)
}