import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Role extends Model {
  declare id: number;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "role"
  },
);