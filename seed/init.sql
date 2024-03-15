CREATE DATABASE IF NOT EXISTS "inlaze-fullstack";

USE "inlaze-fullstack";
-- Creación de la tabla "users"
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  id VARCHAR(36) PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  age INTEGER NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Creación de la tabla "posts"
DROP TABLE IF EXISTS "post";
CREATE TABLE "post" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  user_id VARCHAR(36) REFERENCES "user"(id) ON DELETE CASCADE
);

-- Restricción de unicidad para el email
ALTER TABLE "user" ADD CONSTRAINT unique_email UNIQUE (email);

-- Restricción de no nulo para el campo "user_id" en la tabla "posts"
ALTER TABLE "post" ALTER COLUMN user_id SET NOT NULL;

-- Activación de las foreign keys
ALTER TABLE "post" ENABLE TRIGGER ALL;

-- Insertar varios usuarios
INSERT INTO "user" (id, full_name, age, email, password)
VALUES ('39efce59-2db1-4ecf-a981-813f06ff4846', 'Ana García', 30, 'ana.garcia@correo.com', 'contraseña456'),
       ('f0ce836f-81b4-45d4-a320-4445131e2380', 'Pedro López', 40, 'pedro.lopez@correo.com', 'contraseña789'),
	     ('1e5ac51d-1748-4835-8e2f-57cbbdde1e91','Juan Pérez', 25, 'juan.perez@correo.com', 'contraseña123');

-- Insertar varios posts
INSERT INTO "post" (title, content, user_id)
VALUES ('Un día en la playa', 'Hoy pasé un día maravilloso en la playa', 'f0ce836f-81b4-45d4-a320-4445131e2380'),
       ('Mi nuevo proyecto', 'Estoy trabajando en un nuevo proyecto muy interesante', '39efce59-2db1-4ecf-a981-813f06ff4846'),
	     ('Mi primer post', 'Este es mi primer post en la red social', 'f0ce836f-81b4-45d4-a320-4445131e2380');
