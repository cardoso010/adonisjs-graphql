const Comment = use('App/Models/Comment')
const User = use('App/Models/User')
const Post = use('App/Models/Post')

module.exports = {
    Query: {
    },

    Mutation: {
        createComment: async (root, { commentInput }, context) => {
            return await Comment.create(commentInput)
        },
    },

    Comment: {
        user: async (comment, _, context) => {
            const user = await User.findBy('id', comment.user_id)
            return user.toJSON()
        },
        post: async (comment, _, context) => {
            const post = await Post.findBy('id', comment.post_id)
            return post.toJSON()
        },
    },
}
