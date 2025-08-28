import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';

@Table
export class Allowlist extends Model<Allowlist> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    domain: string;
}
