import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Price extends Model {
  declare id: number;
  declare label: string;
  declare value: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Price.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Price",
    tableName: "price"
  },
);