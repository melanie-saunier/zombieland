import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class User extends Model {
  declare id: string;
  declare email: string;
  declare lastname: string;
  declare firstname: string;
  declare password: string;
  declare role_id: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { 
      type: DataTypes.TEXT,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: "User",
      tableName: "user"
    },
  );