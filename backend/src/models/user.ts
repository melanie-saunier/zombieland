import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";
import { Role } from "./association";


export class User extends Model {
  declare id: number;
  declare email: string;
  declare lastname: string;
  declare firstname: string;
  declare password: string;
  declare role_id: number;
  declare reset_password_token: string | null;
  declare reset_password_expires: Date | null;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

   // Déclaration de l'association
   declare role?: Role; // le ? signifie que ça peut être undefined
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
    {
      sequelize,
      modelName: "User",
      tableName: "user"
    },
  );