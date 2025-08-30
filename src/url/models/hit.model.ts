import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { HitAttributes } from '../interfaces/hit.interface';
import { Url } from './url.model';

@Table({ tableName: 'hit', timestamps: true })
export class Hit extends Model<HitAttributes> implements HitAttributes {
  @ForeignKey(() => Url)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare urlId: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare timestamp: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare ipAddress: string;

  @Index
  @CreatedAt
  declare readonly createdAt: Date;
}
