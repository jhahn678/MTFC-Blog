export const createTestNotification = () => {
    return {
        notification_type: 'Post',
        title: 'This is a test notification',
        avatar: 'https://images.ctfassets.net/fnhljsxx2y84/55CDSo8R6GwoSaVDSNJOgv/6a2f54ed338d5c2918746bbd1351d32a/MTFC-logo.svg'
    }
}

export const createPostNotification = (postId, title) => {
    return {
        notification_type: 'Post',
        post: postId,
        title: title
    }
}

export const createReplyNotification = (commentId, title) => {
    return {
        notification_type: 'Reply',
        comment: commentId,
        title: title
    }
}