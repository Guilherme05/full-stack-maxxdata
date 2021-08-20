import { DateTime } from 'luxon'
import ProfessionalType from 'App/Models/ProfessionalType'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Professional extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public telefone: string

  @column()
  public email: string

  @column({serializeAs: null})
  public tipo_de_professional: number

  @column()
  public situacao: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => ProfessionalType, {
    foreignKey: 'tipo_de_professional'
  })
  public tipoProfissional: BelongsTo<typeof ProfessionalType>
  
}
