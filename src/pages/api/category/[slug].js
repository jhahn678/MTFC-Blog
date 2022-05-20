import connectMongo from '../../../utils/connectMongo'
import Category from '../../../models/category'

export default async function handler(req, res){

    const { slug } = req.query;

    await connectMongo()

    const category = await Category.findOne({ slug })

    if(!category){
        throw new Error('Could not find category')
    }

    res.status(200).json(category)
}