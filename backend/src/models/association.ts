import { Activity } from "./activity";
import { Booking } from "./booking";
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
// type One to Many 
Price.hasMany(Price, {
  foreignKey: "price_id",
  as: "bookings",
});
Booking.belongsTo(Price, {
  foreignKey: "price_id",
  as: "price"
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
}