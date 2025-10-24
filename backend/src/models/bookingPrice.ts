import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

export class BookingPrice extends Model {
  declare id: string;
  declare applied_price: number;
  declare booking_id: string;
  declare price_id: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

BookingPrice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applied_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "BookingPrice",
    tableName: "booking_price",
  }
);