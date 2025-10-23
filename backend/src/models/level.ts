import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Level extends Model {
  declare id: string;
  declare name: string;
  declare value: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Level.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3]], // seulement 1, 2 ou 3
      },
      }
    },
    {
      sequelize,
      modelName: "Level",
      tableName: "level"
    },
  );