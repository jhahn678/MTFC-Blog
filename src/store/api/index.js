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
                body: token
            })
        }),
        createComment: builder.mutation({
            query: comment => ({
                url: 'post/comment',
                method: 'POST',
                body: comment
            })
        }),
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `post/comment/${commentId}`,
                method: 'DELETE',
                body: { postId }
            })
        }),
        createReply: builder.mutation({
            query: ({ commentId, ...body }) => ({
                url: `post/comment/${commentId}`,
                method: 'POST',
                body: body
            })
        }),
        followAuthor: builder.mutation({
            query: id => ({
                url: `author/follow/${id}`,
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
        getAuthors: builder.query({
            query: () => 'author'
        }),
        getPost: builder.query({
            query: slug => `post/${slug}`
        }),
        getPosts: builder.query({
            query: () => 'post'
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
    useGetPostQuery,
    useGetPostsQuery,
    useGetCategoryQuery,
    useGetCategoriesQuery,
    useGetUserQuery,
    useLazyGetMeQuery
} = api;
