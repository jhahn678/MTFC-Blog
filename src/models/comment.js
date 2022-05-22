import mongoose from 'mongoose'
import User from '../models/user'

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
        display_name: String,
        avatar: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Post'
    },
    body: String,
    replies: []
}, { timestamps: true })

commentSchema.pre('save', async function(next){
    const user = await User.findById(this.user._id)
    this.user.avatar = user.account.avatar;
    next()
})

export default commentSchema;