import connectMongo from '../../../utils/connectMongo'
import Category from '../../../models/category'

export default async function handler(req, res){

    await connectMongo()

    const categories = await Category.find()

    res.status(200).json(categories)
}