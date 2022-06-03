import connectMongo from "../connectMongo";
import Category from "../../models/category";
import Author from "../../models/author";
import Post from "../../models/post";
import Comment from '../../models/comment'

export const getAllAuthorsIds = async () => {

    await connectMongo()

    const results = await Author.find().lean()
    
    const authors = results.map(r => JSON.parse(JSON.stringify(r._id)))

    return authors;

}

export const getAuthorById = async (id) => {

    await connectMongo()

    const result = await Author
        .findById(id)
        .lean()
        .populate({
            path: 'posts',
            select: '-comments -author',
            options: { limit: 6, sort: '-createdAt' }
        })
    
    const author = JSON.parse(JSON.stringify(result))

    return author;
}