import mongoose from 'mongoose'
import Post from '../models/post'
import Category from '../models/category'

const authorSchema = new mongoose.Schema({
    entry_id: String,
    displayName: String,
    slug: String,
    bio: String,
    avatar: String,
    location: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    totalPosts: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    socials: {
        facebook: String,
        instagram: String,
        twitter: String,
        website: String
    }
}, { timestamps: true })

export default mongoose.models.Author || mongoose.model('Author', authorSchema)