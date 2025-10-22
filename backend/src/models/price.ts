import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Price extends Model {
  declare id: string;
  declare label: string;
  declare value: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Price.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
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