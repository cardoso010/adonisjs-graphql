const GraphQLError = use('GraphQLError')
const User = use('App/Models/User')
const Todo = use('App/Models/Todo')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')

module.exports = {
    Query: {
        user: async (root, { id }, context) => {
            const user = await User.find(id)
            if (user) {
                return user.toJSON()
            } else {
                throw new GraphQLError('message', ['User not found!'])
            }
        },
        users: async (root, datas, context) => {
            const users = await User.all()
            return users.toJSON()
        },
    },

    Mutation: {
        createUser: async (root, { userInput }, context) => {
            return await User.create(userInput)
        },
        updateUser: async (root, { updateUserInput }) => {
            const { id } = updateUserInput
            const user = await User.find(id)
            if (user) {
                Object.keys(updateUserInput).map(param => user[param] = updateUserInput[param])
                const getUser = user.toJSON()
                await user.save()
                return getUser
            } else {
                throw new GraphQLError('message', ['User not found'])
            }
        },
        deleteUser: async (root, { id }, context) => {
            return await User.query().where('id', id).delete()
        },
    },

    User: {
        todos: async (user, _, context) => {
            const todos = await Todo.query().where('user_id', user.id).fetch()
            return todos.toJSON()
        },
        posts: async (user, _, context) => {
            const posts = await Post.query().where('user_id', user.id).fetch()
            return posts.toJSON()
        },
        comments: async (user, _, context) => {
            const comments = await Comment.query().where('user_id', user.id).fetch()
            return comments.toJSON()
        },
    },
}
