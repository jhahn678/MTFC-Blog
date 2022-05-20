import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    user: {
        _id: {     
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType'
        },
        userType: {
            type: String,
            enum: ['User', 'Author']
        },
        display_name: String
    },
    body: String,
    replies: []
}, { timestamps: true })

export default commentSchema;