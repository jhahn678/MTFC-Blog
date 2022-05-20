import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Category from '../../../models/category'
import Author from '../../../models/author'

export default async function handler(req, res){

    await connectMongo()

    const posts = await Post.find().populate('category author')

    res.status(200).json(posts)
}