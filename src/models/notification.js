import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    notification_type: {
        type: String,
        enum: ['Post', 'Reply']
    },
    status: {
        type: String,
        enum: ['Read', 'Unread']
    },
    title: String,
    message: String
}, { timestamps: true })

export default notificationSchema;