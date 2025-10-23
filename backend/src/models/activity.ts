import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Activity extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare duration: number;
  declare min_height: number;
  declare pregnancy_warning: boolean;
  declare image_ref: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Activity.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pregnancy_warning: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      image_ref: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Activity",
      tableName: "activity"
    },
  );