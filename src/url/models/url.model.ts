import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

@Table
export class Url extends Model<Url> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    longUrl: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    shortCode: string;

    @Default(0)
    @Column(DataType.INTEGER)
    hits: number;
}
