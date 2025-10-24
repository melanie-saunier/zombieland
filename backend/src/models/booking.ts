import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";
import { Price } from "./price"; 

export class Booking extends Model {
  declare id: string;
  declare visit_date: Date;
  declare nb_people: number;
  declare amount: number;
  declare status: boolean;
  declare user_id: string;
  declare price_id: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: "Booking",
      tableName: "booking",
      // Utilisation de deux hooks de Sequelize pour calculer automatiquement le champ amount : price.value * booking.nb_people
      hooks: {
        // avant d’insérer la réservation, on récupère le prix correspondant au price_id et on calcule amount.
        beforeCreate: async (booking) => {
          const price = await Price.findByPk(booking.price_id);
          if (price) {
            booking.amount = price.value * booking.nb_people;
          }
        },
        // si nb_people ou price_id change, on recalcule automatiquement amount
        beforeUpdate: async (booking) => {
          if (booking.changed("nb_people") || booking.changed("price_id")) {
            const price = await Price.findByPk(booking.price_id);
            if (price) {
              booking.amount = price.value * booking.nb_people;
            }
          }
        },
    },
  }
);