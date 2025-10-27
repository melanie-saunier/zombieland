import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class Booking extends Model {
  declare id: number;
  declare visit_date: Date;
  declare nb_people: number;
  declare status: boolean;
  declare user_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    visit_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nb_people: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "booking",
  }
);