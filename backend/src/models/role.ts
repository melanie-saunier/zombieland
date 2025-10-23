import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Role extends Model {
  declare id: string;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Role.init(
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
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "role"
    },
  );