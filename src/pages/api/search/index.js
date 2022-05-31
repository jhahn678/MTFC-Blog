import connectMongo from '../../../utils/connectMongo'
import Post from '../../../models/post'
import Author from '../../../models/author'
import Category from '../../../models/category'

export default async function handler(req, res){

    await connectMongo();

    const { value } = req.query;

    console.log(value)

    let results = []

    const posts = await Post.aggregate()
            .search({
                index: 'search-posts',
                compound: {
                    should: [
                        { autocomplete: { path: 'title', query: value } },
                        { text: { path: 'preview', query: value } }
                    ]
                }
            })
            .lookup({ from: 'authors', localField: 'author', foreignField: '_id', as: 'author'})
            .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category'})
            .unwind('author').unwind('category')
            .project({
                resource_type: 'POST',
                _id: 1,
                title: 1,
                slug: 1,
                thumbnail: 1,
                createdAt: 1,
                'author._id': 1,
                'author.displayName': 1,
                'author.avatar': 1,
                'category.title': 1,
                'category.slug': 1,
                score: {
                    '$meta': 'searchScore'
                }
            })

    const authors = await Author.aggregate()
        .search({
            index: 'search-authors',
                compound: {
                    should: [
                        { autocomplete: { path: 'displayName', query: value } },
                        { text: { path: 'bio', query: value } }
                    ]
                }
        })
        .project({
            resource_type: 'AUTHOR',
            _id: 1,
            displayName: 1,
            avatar: 1,
            location: 1,
            bio: 1,
            totalPosts: 1,
            score: {
                '$meta': 'searchScore'
            }
        })

    const categories = await Category.aggregate()
        .search({
            index: 'search-category',
                compound: {
                    should: [
                        { autocomplete: { path: 'title', query: value } },
                        { text: { path: 'description', query: value } }
                    ]
                }
        })
        .project({
            resource_type: 'CATEGORY',
            slug: 1,
            title: 1,
            description: 1,
            thumbnail: 1,
            score: {
                '$meta': 'searchScore'
            }
        })

    results = [...posts, ...categories, ...authors].sort((x, y) => y.score - x.score)

    res.status(200).json(results)

}