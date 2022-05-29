import connectMongo from '../../../../utils/connectMongo'
import User from '../../../../models/user'
import Post from '../../../../models/post'
import AuthError from '../../../../utils/AuthError'
import { verifyAuthToken } from '../../../../utils/authToken'


export default async function handler (req, res){

    await connectMongo()

    const { AUTH_TOKEN: token } = req.cookies;

    const { limit=10, page=1 } = req.query

    if(!token){
        throw new AuthError(400, 'Authentication Invalid')
    }

    const payload = await verifyAuthToken(token)

    const user = await User.findById(payload._id)
        .populate({
            path: 'comments',
            perDocumentLimit: limit,
            options: { 
                skip: ( ( page - 1 ) * limit )
            },
            populate: {
                path: 'post parentComment',
                select: 'title slug commentCount user'
            }
        })
        .select('comments -_id')

    res.status(200).json(user)
}