import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.timestamp('created_at').defaultTo(this.now()) // 🔹 Agregado defaultTo
      table.timestamp('updated_at').defaultTo(this.now()) // 🔹 Agregado defaultTo
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
