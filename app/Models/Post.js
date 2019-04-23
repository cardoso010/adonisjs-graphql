'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    likes() {
        return this.hasMany('App/Models/Like')
    }

    comments() {
        return this.hasMany('App/Models/Comment')
    }
}

module.exports = Post
