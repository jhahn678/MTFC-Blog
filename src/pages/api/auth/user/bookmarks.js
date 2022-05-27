import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'
import AuthError from '../../../../utils/AuthError'
import { verifyAuthToken } from '../../../../utils/authToken'


export default async function handler (req, res){

    await connectMongo()

    const { AUTH_TOKEN: token } = req.cookies;

    const { page=1, limit=10 } = req.query;

    if(!token){
        throw new AuthError(400, 'Authentication Invalid')
    }

    const payload = await verifyAuthToken(token)

    const user = await User.findById(payload._id)
        .populate({
            path: 'bookmarks',
            perDocumentLimit: limit,
            options: { skip: ( limit * ( page - 1 ) ) },
            populate: {
                path: 'author'
            }
        })
        .select('bookmarks')

    res.status(200).json(user)
}