import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { AllowlistAttributes } from '../interfaces/allowlist.interface';

@Table({ tableName: 'allowlist', timestamps: true })
export class Allowlist
  extends Model<AllowlistAttributes>
  implements AllowlistAttributes
{
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare domain: string;
}
