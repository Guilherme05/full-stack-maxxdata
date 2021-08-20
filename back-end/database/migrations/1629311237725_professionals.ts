import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Professionals extends BaseSchema {
  protected tableName = 'professionals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table
        .increments('id')
        .primary()
      table
        .string('nome', 244)
        .notNullable()
      table
        .string('telefone', 15)
      table
        .string('email', 244)
      table
        .integer('tipo_de_professional')
        .unsigned()
        .references('id')
        .inTable('professional_types')
        .onDelete('CASCADE')
        .notNullable()
      table
        .boolean('situacao')
        .defaultTo(true)
      table
        .timestamp('created_at', { useTz: true })
      table
        .timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
