import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Activity extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare duration: number;
  declare min_height: number;
  declare pregnancy_warning: boolean;
  declare image_ref: string;
  declare level_id: number;
  declare category_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Activity.init(
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
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Activity",
    tableName: "activity"
  },
);