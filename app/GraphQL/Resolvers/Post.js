const GraphQLError = use('GraphQLError')
const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const Like = use('App/Models/Like')


module.exports = {
    Query: {
        post: async (root, { id }, context) => {
            const post = await Post.find(id)
            if (post) {
                return post.toJSON()
            } else {
                throw new GraphQLError('message', ['Post not found!'])
            }
        },
        posts: async (root, datas, context) => {
            const posts = await Post.all()
            return posts.toJSON()
        },
    },

    Mutation: {
        createPost: async (root, { postInput }, context) => {
            return await Post.create(postInput)
        },
        updatePost: async (root, { updatePostInput }) => {
            const { id } = updatePostInput
            const post = await Post.find(id)
            if (post) {
                Object.keys(updatePostInput).map(param => post[param] = updatePostInput[param])
                const getPost = post.toJSON()
                await post.save()
                return getPost
            } else {
                throw new GraphQLError('message', ['Post not found'])
            }
        },
        deletePost: async (root, { id }, context) => {
            return await Post.query().where('id', id).delete()
        },
    },

    Post: {
        user: async (like, _, context) => {
            const user = await User.findBy('id', like.user_id)
            return user.toJSON()
        },
        comments: async (post, _, context) => {
            const comments = await Comment.query().where('post_id', post.id).fetch()
            return comments.toJSON()
        },
        likes: async (post, _, context) => {
            const likes = await Like.query().where('post_id', post.id).fetch()
            return likes.toJSON()
        },
    },
}
