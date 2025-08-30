import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UrlAttributes } from '../interfaces/url.interface';

@Table({ tableName: 'url', timestamps: true })
export class Url extends Model<UrlAttributes> implements UrlAttributes {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare shortCode: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare longUrl: string;
}
