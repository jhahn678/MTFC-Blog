import connectMongo from '../../../utils/connectMongo'
import Author from '../../../models/author'

export default async function handler(req, res){

    await connectMongo()

    const authors = await Author.find()

    res.status(200).json(authors)
}