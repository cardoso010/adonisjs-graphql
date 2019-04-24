const Comment = use('App/Models/Comment')
const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Like = use('App/Models/Like')

module.exports = {
    Query: {
    },

    Mutation: {
        createLike: async (root, { likeInput }, context) => {
            return await Like.create(likeInput)
        },
    },

    Like: {
        user: async (like, _, context) => {
            const user = await User.findBy('id', like.user_id)
            return user.toJSON()
        },
        post: async (like, _, context) => {
            const post = await Post.findBy('id', like.post_id)
            return post.toJSON()
        },
    },
}
