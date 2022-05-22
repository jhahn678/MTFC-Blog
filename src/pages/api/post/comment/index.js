import connectMongo from '../../../utils/connectMongo'
import { verifyAuthToken } from '../../../../utils/authToken'
import AuthError from '../../../../utils/AuthError'
import Post from '../../../../models/post'
import User from '../../../../models/user'

export default async function handler(req, res){

    await connectMongo()

    if(req.method === 'POST'){

        const { AUTH_TOKEN: token } = req.cookies;

        if(!token){
            throw new AuthError('Must be authenticated to post comments')
        }

        const payload = await verifyAuthToken(token)

        const { postId, body } = req.body;

        const post = await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    user: {
                        _id: payload._id,
                        displayName: payload.displayName
                    },
                    post: postId,
                    body: body,
                }
            }
        }, { new: true })

        const user = await User.findByIdAndUpdate(req.user._id, {
            $push: {
                comments: {
                    user: {
                        _id: payload._id,
                        displayName: payload.displayName
                    },
                    post: postId,
                    body: body,
                }
            }
        }, { new: true })

        res.status(201).json({ message: 'Comment created successfully', post, user })
    }

}