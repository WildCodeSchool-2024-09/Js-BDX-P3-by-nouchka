
CREATE TABLE pages (
    name VARCHAR(255) NOT NULL PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE photos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    URL TEXT NOT NULL
);

CREATE TABLE likes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL
);

CREATE TABLE events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT NOW() NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    pages_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (pages_name) REFERENCES pages(name)
    ON DELETE CASCADE
);

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE admin (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
  users_id INT UNSIGNED NOT NULL, 
  FOREIGN KEY (users_id) REFERENCES users(id)
  ON DELETE CASCADE
);

CREATE TABLE address (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    street_number TEXT NOT NULL,
    street_name TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE jewelry (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    type VARCHAR(255) NOT NULL,
    stock INT UNSIGNED NOT NULL,
    description TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE clients (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    users_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE photos_jewelry (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    photos_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (photos_id) REFERENCES photos(id)
    ON DELETE CASCADE,
    jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (jewelry_id) REFERENCES jewelry(id)
    ON DELETE CASCADE
);

CREATE TABLE billing_address (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id)
    ON DELETE CASCADE
);

CREATE TABLE shipping_address (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id)
    ON DELETE CASCADE
);

CREATE TABLE photos_pages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    photos_id INT UNSIGNED NOT NULL,
    FOREIGN KEY(photos_id) REFERENCES photos(id)
    ON DELETE CASCADE
);

CREATE TABLE photos_events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    photos_id INT UNSIGNED NOT NULL,
   FOREIGN KEY(photos_id) REFERENCES photos(id)
   ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    status BOOLEAN NOT NULL DEFAULT 0,
    date TIMESTAMP DEFAULT NOW() NOT NULL 
);

CREATE TABLE clients_orders (
  clients_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (clients_id) REFERENCES clients(id)
    ON DELETE CASCADE,
    orders_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id)
    ON DELETE CASCADE
);

CREATE TABLE orders_address (
  orders_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id)
    ON DELETE CASCADE,
    address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id)
    ON DELETE CASCADE
);

CREATE TABLE jewelry_orders (
  jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (jewelry_id) REFERENCES jewelry(id)
    ON DELETE CASCADE,
    orders_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id)
    ON DELETE CASCADE,
    quantity INT UNSIGNED NOT NULL
);

CREATE TABLE jewelry_clients (
  jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (jewelry_id) REFERENCES jewelry(id)
    ON DELETE CASCADE,
    clients_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (clients_id) REFERENCES clients(id)
    ON DELETE CASCADE
);

CREATE TABLE likes_clients (
  clients_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (clients_id) REFERENCES clients(id)
    ON DELETE CASCADE,
    likes_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (likes_id) REFERENCES likes(id)
    ON DELETE CASCADE
);

CREATE TABLE likes_jewelry (
  jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (jewelry_id) REFERENCES jewelry(id)
    ON DELETE CASCADE,
    likes_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (likes_id) REFERENCES likes(id)
    ON DELETE CASCADE
);

CREATE TABLE pages_photos_pages (
  pages_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (pages_name) REFERENCES pages(name)
    ON DELETE CASCADE,
    photos_pages_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (photos_pages_id) REFERENCES photos(id)
    ON DELETE CASCADE
);

CREATE TABLE events_photos_events (
  events_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (events_id) REFERENCES events(id)
    ON DELETE CASCADE,
    photos_events_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (photos_events_id) REFERENCES photos_events(id)
    ON DELETE CASCADE
);

CREATE TABLE jewelry_photos_jewelry (
  photos_jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (photos_jewelry_id) REFERENCES photos_jewelry(id)
    ON DELETE CASCADE,
    jewelry_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (jewelry_id) REFERENCES jewelry(id)
    ON DELETE CASCADE
);