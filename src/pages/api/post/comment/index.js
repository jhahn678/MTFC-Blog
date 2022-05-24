import connectMongo from '../../../../utils/connectMongo'
import { verifyAuthToken } from '../../../../utils/authToken'
import AuthError from '../../../../utils/AuthError'
import Post from '../../../../models/post'
import User from '../../../../models/user'
import Comment from '../../../../models/comment'

export default async function handler(req, res){

    //Adding a comment to a post

    await connectMongo()

    if(req.method === 'POST'){

        const { AUTH_TOKEN: token } = req.cookies;

        if(!token){
            throw new AuthError('Must be authenticated to post comments')
        }

        const payload = await verifyAuthToken(token)

        const { postId, body, mention } = req.body;

        const newComment = new Comment({
            user: {
                _id: payload._id,
                displayName: payload.displayName,
                avatar: payload.avatar
            },
            post: postId,
            parentComment: null,
            mention: mention ? mention : null,
            body: body,
        })

        const comment = await newComment.save()

        const post = await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id },
            $inc: { commentCount: 1 }
        }, { new: true })

        const user = await User.findByIdAndUpdate(payload._id, {
            $push: { comments: comment._id }
        }, { new: true })

        return res.status(201).json({
            message: 'Comment created successfully', 
            comment,
            post, 
            user 
        })
    }

}