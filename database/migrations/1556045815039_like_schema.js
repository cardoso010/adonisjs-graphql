'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LikeSchema extends Schema {
  up() {
    this.create('likes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('post_id').unsigned().references('id').inTable('posts')
      table.timestamps()
    })
  }

  down() {
    this.drop('likes')
  }
}

module.exports = LikeSchema
