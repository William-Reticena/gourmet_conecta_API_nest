DROP TABLE IF EXISTS operation_time CASCADE;
DROP TABLE IF EXISTS restaurant CASCADE;
DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS dish CASCADE;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS role;
------------------- TYPES CREATION -------------------
DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_type
  WHERE typname = 'address_type'
) THEN CREATE TYPE address_type AS ENUM ('residential', 'commercial', 'delivery');
END IF;
END $$;
DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_type
  WHERE typname = 'category_type'
) THEN CREATE TYPE category_type AS ENUM (
  'Entrada',
  'Principal',
  'Sobremesa',
  'Bebida',
  'Salada',
  'Aperitivo',
  'Petisco',
  'Infantil',
  'Especial'
);
END IF;
END $$;
DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_type
  WHERE typname = 'day_of_week_type'
) THEN CREATE TYPE day_of_week_type AS ENUM (
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
);
END IF;
END $$;
DO $$ BEGIN IF NOT EXISTS (
  SELECT 1
  FROM pg_type
  WHERE typname = 'dish_type'
) THEN CREATE TYPE dish_type AS ENUM (
  'Doce',
  'Salgado',
  'Bebida',
  'Vegetariano',
  'Sem glúten',
  'Sem lactose',
  'Low carb',
  'Gourmet'
);
END IF;
END $$;
-------------------------------------------------------
------------------- TABLES CREATION -------------------
CREATE TABLE IF NOT EXISTS role (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY NOT NULL,
  role_id INTEGER,
  address_id INTEGER,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL,
  token_validation VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (role_id) REFERENCES role(id)
);
CREATE TABLE IF NOT EXISTS address (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  active_for_delivery BOOLEAN NOT NULL,
  type address_type,
  street VARCHAR(255) NOT NULL,
  number INTEGER NOT NULL,
  complement VARCHAR(255),
  neighborhood VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  zip_code VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS restaurant (
  id SERIAL PRIMARY KEY NOT NULL,
  address_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS operation_time (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  opening_time TIME NOT NULL,
  closing_time TIME NOT NULL,
  break_start_time TIME,
  break_end_time TIME,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS menu (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  category category_type NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (restaurant_id) REFERENCES restaurant(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS dish (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  ingredients TEXT NOT NULL,
  photo_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (menu_id) REFERENCES menu(id) ON DELETE CASCADE
);
-------------------------------------------------------
------------------ INSERTS FOR ROLE -------------------
INSERT INTO role (name, description, created_at, updated_at)
VALUES ('admin', 'Administrator', NOW(), NOW());
INSERT INTO role (name, description, created_at, updated_at)
VALUES ('client', 'Client', NOW(), NOW());
INSERT INTO role (name, description, created_at, updated_at)
VALUES ('manager', 'Manager', NOW(), NOW());
-------------------------------------------------------