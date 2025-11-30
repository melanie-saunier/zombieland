import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Category extends Model {
  declare id: number;
  declare name: string;
  declare color: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Category.init(
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
    color: {
      type: DataTypes.CHAR(7),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "category"
  },
);