import AuthError from '../../../../utils/AuthError'
import { verifyAuthToken } from '../../../../utils/authToken'
import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'


export default async function handler (req, res){

    await connectMongo()

    const { AUTH_TOKEN: token } = req.cookies;

    if(!token){
        throw new AuthError(400, 'Authentication Invalid')
    }

    const payload = await verifyAuthToken(token)


    const user = await User.findById(payload._id)
        .populate({
            path: 'bookmarks',
            populate: {
                path: 'author'
            }
        })
        .populate({
            path: 'comments',
            perDocumentLimit: 10,
            populate: {
                path: 'post parentComment',
                select: 'title slug commentCount user'
            }
        })
        .populate({
            path: 'following',
            populate: {
                path: 'posts'
            }
        })
        .populate({
            path: 'notifications',
            populate: {
                path: 'post comment'
            }
        })
        .select('-account.password')

    res.status(200).json(user)
}