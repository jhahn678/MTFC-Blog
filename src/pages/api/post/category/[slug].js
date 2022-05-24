import connectMongo from '../../../../utils/connectMongo'
import Post from '../../../../models/post'
import Category from '../../../../models/category'
import Author from '../../../../models/author'

export default async function handler(req, res){

    await connectMongo()

    const { slug } = req.query;

    const category = await Category.findOne({ slug })

    const posts = await Post.find({ category: category._id }).populate('author category')

    return res.status(200).json(posts)

}