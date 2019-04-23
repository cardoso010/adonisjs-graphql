'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoSchema extends Schema {
  up() {
    this.create('todos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title', 60).notNullable()
      table.string('description', 255)
      table.enu('status', ['TO_DO', 'DOING', 'DONE'])
      table.timestamps()
    })
  }

  down() {
    this.drop('todos')
  }
}

module.exports = TodoSchema
