import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react/'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/api/'}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ ...body }) => ({
                url: 'auth/login',
                method: 'POST',
                body: body
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: ({ ...body }) => ({
                url: 'auth/register',
                method: 'POST',
                body: body
            })
        }),
        googleAuth: builder.mutation({
            query: token => ({
                url: 'auth/google',
                method: 'POST',
                body: { token }
            })
        }),
        createComment: builder.mutation({
            query: comment => ({
                url: 'comment',
                method: 'POST',
                body: comment
            })
        }),
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `comment/${commentId}`,
                method: 'DELETE',
                body: { postId }
            })
        }),
        createReply: builder.mutation({
            query: ({ commentId, ...body }) => ({
                url: `comment/${commentId}`,
                method: 'POST',
                body: body
            })
        }),
        followAuthor: builder.mutation({
            query: id => ({
                url: `author/${id}/follow`,
                method: 'POST',
            })
        }),
        bookmarkPost: builder.mutation({
            query: id => ({
                url: `post/bookmark/${id}`,
                method: 'POST',
            })
        }),
        getAuthor: builder.query({
            query: id => `author/${id}`
        }),
        getAuthorPosts: builder.query({
            query: ({ id, page=1, limit=8 }) => `author/${id}/posts?page=${page}&limit=${limit}`
        }),
        getAuthors: builder.query({
            query: () => 'author'
        }),
        getPost: builder.query({
            query: slug => `post/${slug}`
        }),
        getPostComments: builder.query({
            query: slug => `post/${slug}/comments`
        }),
        getPosts: builder.query({
            query: () => 'post'
        }),
        getComment: builder.query({
            query : id => `comment/${id}`
        }),
        getCategory: builder.query({
            query: slug => `category/${slug}`
        }),
        getCategories: builder.query({
            query: () => 'category'
        }),
        getUser: builder.query({
            query: id => `user/${id}`
        }),
        getMe: builder.query({
            query: () => 'auth/user'
        }),
        getMyBookmarks: builder.query({
            query: ({ limit=10, page=1 }) => `auth/user/bookmarks?page=${page}&limit=${limit}`
        }),
        getMyNotifications: builder.query({
            query: () => 'auth/user/notifications'
        }),
        deleteNotifications: builder.mutation({
            query: (array) => ({
                url: 'auth/user/notifications',
                method: 'DELETE',
                body: { notifications: array }
            })
        }),
        markNoticationRead: builder.mutation({
            query: () => ({
                url: 'auth/user/notifications',
                method: 'PATCH'
            })
        }),
        testNotification: builder.mutation({
            query: () => ({
                url: 'auth/user/notifications',
                method: 'POST'
            })
        }),
        getMyComments: builder.query({
            query: ({ limit=10, page=1 }) => `auth/user/comments?page=${page}&limit=${limit}`
        }),
        getMyFollowing: builder.query({
            query: () => 'auth/user/following'
        })
    })
})

export const { 
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation, 
    useGoogleAuthMutation,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useCreateReplyMutation,
    useBookmarkPostMutation,
    useFollowAuthorMutation,
    useGetAuthorQuery,
    useGetAuthorsQuery,
    useLazyGetAuthorPostsQuery,
    useLazyGetCommentQuery,
    useGetPostQuery,
    useGetPostsQuery,
    useLazyGetPostCommentsQuery,
    useGetCategoryQuery,
    useGetCategoriesQuery,
    useGetUserQuery,
    useLazyGetMeQuery,
    useLazyGetMyBookmarksQuery,
    useLazyGetMyNotificationsQuery,
    useDeleteNotificationsMutation,
    useMarkNoticationReadMutation,
    useTestNotificationMutation,
    useLazyGetMyCommentsQuery,
    useLazyGetMyFollowingQuery
} = api;
