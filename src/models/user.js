import mongoose from 'mongoose'
import commentSchema from './comment'
import notificationSchema from './notification'

const userSchema = new mongoose.Schema({
    account: {
        displayName: String,
        email: String,
        googleId: String,
        password: String,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    notifications: [notificationSchema],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    ],
    comments: [commentSchema]
})

export default mongoose.models.User || mongoose.model('User', userSchema)