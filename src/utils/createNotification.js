export const createTestPostNotification = () => {
    return {
        notification_type: 'Post',
        title: 'TEST -- MTFC Team made a new post!',
        avatar: 'https://images.ctfassets.net/fnhljsxx2y84/55CDSo8R6GwoSaVDSNJOgv/6a2f54ed338d5c2918746bbd1351d32a/MTFC-logo.svg',
        post: '628e4ce05c7d447642225b4c'
    }
}

export const createTestReplyNotification = () => {
    return {
        notification_type: 'Reply',
        title: 'TEST -- John Doe replied to your comment',
        avatar: 'https://images.ctfassets.net/fnhljsxx2y84/2hECnnGiyiSmvWxX9tBs7d/cddcf6d9f5354ed9e8a7b5c4c159fc53/avatar.jpeg',
        comment: '62937cf9e6b3c683f5ec3f64',
        post: '628e4ce05c7d447642225b6f'
    }
}

export const createPostNotification = (postId, authorDisplayName, customTitle) => {
    return {
        notification_type: 'Post',
        post: postId,
        title: customTitle || `${authorDisplayName} made a new post!`
    }
}

export const createReplyNotification = (commentId, postId, userDisplayName, customTitle) => {
    return {
        notification_type: 'Reply',
        comment: commentId,
        post: postId,
        title: customTitle || `${userDisplayName} replied to your comment`
    }
}

export const createCommentNotification = (commentId, postId, userDisplayName, postTitle, customTitle) => {
    return{
        notification_type: 'Comment',
        comment: commentId,
        post: postId,
        title: customTitle || `${userDisplayName} commented on ${postTitle}`
    }
}