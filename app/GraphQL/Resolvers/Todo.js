const GraphQLError = use('GraphQLError')
const User = use('App/Models/User')
const Todo = use('App/Models/Todo')


module.exports = {
    Query: {
        todo: async (root, { id }, context) => {
            const todo = await Todo.find(id)
            if (todo) {
                return todo.toJSON()
            } else {
                throw new GraphQLError('message', ['Todo not found!'])
            }
        },
        todos: async (root, datas, context) => {
            const todos = await Todo.all()
            return todos.toJSON()
        },
    },

    Mutation: {
        createTodo: async (root, { todoInput }, context) => {
            const todo = await Todo.create(todoInput)
            return todo.toJSON()
        },
        updateTodo: async (root, { updateTodoInput }) => {
            const { id } = updateTodoInput
            const todo = await Todo.find(id)
            if (todo) {
                Object.keys(updateTodoInput).map(param => todo[param] = updateTodoInput[param])
                const getTodo = todo.toJSON()
                await todo.save()
                return getTodo
            } else {
                throw new GraphQLError('message', ['Todo not found'])
            }
        },
        deleteTodo: async (root, { id }, context) => {
            return await Todo.query().where('id', id).delete()
        },
    },

    Todo: {
        user: async (todo, _, context) => {
            const user = await User.findBy('id', todo.user_id)
            return user.toJSON()
        },
    },
}
