import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import BlogPost from './blog_post.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare blogPostId: number

  @column()
  declare userId: number

  @column()
  declare comment: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relación: Un comentario pertenece a un post
  @belongsTo(() => BlogPost)
  declare blogPost: BelongsTo<typeof BlogPost>

  // Relación: Un comentario pertenece a un usuario
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
