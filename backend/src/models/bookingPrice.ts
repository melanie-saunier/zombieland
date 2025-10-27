import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class BookingPrice extends Model {
  declare id: number;
  declare applied_price: number;
  declare booking_id: number;
  declare price_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

BookingPrice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applied_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "BookingPrice",
    tableName: "booking_price",
  }
);