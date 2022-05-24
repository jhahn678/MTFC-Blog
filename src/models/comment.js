import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    user: {
        _id: {     
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType'
        },
        userType: {
            type: String,
            enum: ['User', 'Author'],
            default: 'User'
        },
        displayName: String,
        avatar: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    body: String,
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true })

export default  mongoose.models.Comment || mongoose.model('Comment', commentSchema)