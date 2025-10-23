import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Category extends Model {
  declare id: string;
  declare name: string;
  declare color: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Category.init(
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
      color: {
        type: DataTypes.CHAR(7),
        allowNull: false,
        // TODO: valeur par défaut ? il faut qu'on choisisse les couleurs de nos catégories
      }
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "category"
    },
  );