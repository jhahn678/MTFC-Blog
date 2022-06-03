import connectMongo from "../connectMongo";
import Category from "../../models/category";

export const getAllCategories = async () => {

    await connectMongo()

    const results = await Category.find().lean()

    const categories = JSON.parse(JSON.stringify(results))

    return categories

}

export const getCategoryBySlug = async (slug) => {
    
    await connectMongo()

    const result = await Category.findOne({ slug: slug }).lean()

    result._id = result._id.toString()

    return result;

}