BEGIN;

DROP TABLE IF EXISTS "role", "user", "price", "booking_price", "booking", "category", "level", "activity" CASCADE;
DROP DOMAIN IF EXISTS "email_str", "hex_color";

-- Création de domain 
-- Pour l'email :
CREATE DOMAIN email_str AS TEXT
  CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Pour le code HEXA de la couleur :
CREATE DOMAIN hex_color AS CHAR(7)
  CHECK (VALUE ~* '^#[0-9A-Fa-f]{6}$');

-- Création des tables
-- Table: role
CREATE TABLE role (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: user
CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email email_str NOT NULL UNIQUE,
  lastname VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL REFERENCES role(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: level
CREATE TABLE level (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL CHECK (value IN (1, 2, 3)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: category
CREATE TABLE category (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  color hex_color NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: activity
CREATE TABLE activity (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL CHECK (duration > 0),
  min_height INTEGER NOT NULL CHECK (min_height >= 0),
  pregnancy_warning BOOLEAN NOT NULL,
  image_ref VARCHAR(255) NOT NULL,
  level_id INT NOT NULL REFERENCES level(id),
  category_id INT NOT NULL REFERENCES category(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: price
CREATE TABLE price (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value NUMERIC(10,2) NOT NULL CHECK (value > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: booking
CREATE TABLE booking (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visit_date DATE NOT NULL,
  nb_people INTEGER NOT NULL CHECK (nb_people > 0),
  status BOOLEAN NOT NULL,
  user_id INT NOT NULL REFERENCES "user"(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: booking_price
CREATE TABLE booking_price (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  applied_price NUMERIC(10,2) NOT NULL CHECK (applied_price > 0),
  booking_id INT NOT NULL REFERENCES booking(id),
  price_id INT NOT NULL REFERENCES price(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
