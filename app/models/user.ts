import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare username: string  // Nombre del usuario

  @column()
  declare email: string  // Correo electrónico (debe ser único en la DB)

  @column()
  declare password: string  // Contraseña (hashed)

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}