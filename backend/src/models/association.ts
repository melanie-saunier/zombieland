import { Activity } from "./activity";
import { Booking } from "./booking";
import { BookingPrice } from "./bookingPrice";
import { Category } from "./category";
import { Level } from "./level";
import { Price } from "./price";
import { Role } from "./role";
import { sequelize } from "./sequelize";
import { User } from "./user";


// Associations Activity et Category
// type One to Many 
Category.hasMany(Activity, {
  foreignKey:"category_id",
  as: "activities",
});
Activity.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// Associations Activity et Level
// type One to Many
Level.hasMany(Activity, {
  foreignKey: "level_id",
  as: "activities",
});
Activity.belongsTo(Level, {
  foreignKey: "level_id",
  as: "level",
})

// Association Role et User
// type One to Many 
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role"
});

// Association User et Booking
// type One to Many 
User.hasMany(Booking, {
  foreignKey: "user_id",
  as: "bookings",
});
Booking.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

// Association Price et Booking
// type Many to Many 
// Un prix peut être appliqué à plusieurs réservations
// Ici, on indique que BookingPrice est la table de liaison
Price.belongsToMany(Booking, {
  through: BookingPrice,
  foreignKey: "price_id",
  otherKey: "booking_id",
  as: "bookings",
});

// Chaque ligne de BookingPrice appartient à une réservation (Many-to-One)
// Cela permet de récupérer la réservation à laquelle un tarif est appliqué
BookingPrice.belongsTo(Booking, {
  foreignKey: "booking_id",
  as: "booking",
});

// Chaque ligne de BookingPrice appartient à un prix (Many-to-One)
// Permet de récupérer le prix appliqué pour une ligne BookingPrice
BookingPrice.belongsTo(Price, {
  foreignKey: "price_id",
  as: "price",
});

// Une réservation peut avoir plusieurs lignes BookingPrice
// Utile pour récupérer l’historique des tarifs appliqués à cette réservation
// Même si chaque réservation n’a qu’un seul tarif appliqué,
// on utilise hasMany pour naviguer facilement vers BookingPrice
// et garder la possibilité d’évoluer si plusieurs tarifs deviennent possibles.
Booking.hasMany(BookingPrice, {
  foreignKey: "booking_id",
  as: "bookingPrices",
});

// Un prix peut être appliqué à plusieurs lignes BookingPrice
// Utile pour savoir toutes les réservations qui ont utilisé ce prix
Price.hasMany(BookingPrice, {
  foreignKey: "price_id",
  as: "bookingPrices",
});



export {
  sequelize,
  Activity,
  Booking,
  Category,
  Level,
  Role,
  User,
  Price,
  BookingPrice,
}


