import mongoose from 'mongoose'
import notificationSchema from './notification'


const userSchema = new mongoose.Schema({
    account: {
        displayName: String,
        email: String,
        googleId: String,
        password: String,
        avatar: String
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    notifications: {
        type: [notificationSchema],
        default: []
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
})

export default mongoose.models.User || mongoose.model('User', userSchema)