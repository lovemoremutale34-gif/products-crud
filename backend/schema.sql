DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT    NOT NULL,
  brand        TEXT    NOT NULL,
  category     TEXT    NOT NULL,
  price        REAL    NOT NULL DEFAULT 0,
  stock        INTEGER NOT NULL DEFAULT 0,
  description  TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (product_name, brand, category, price, stock, description) VALUES
('Galaxy S24',         'Samsung',   'Phone',     999.99, 25, 'Flagship Android smartphone'),
('iPhone 15 Pro',      'Apple',     'Phone',    1199.00, 18, 'Titanium-body iOS flagship'),
('MacBook Air M3',     'Apple',     'Laptop',   1299.00, 12, 'Lightweight 13-inch laptop'),
('ThinkPad X1 Carbon', 'Lenovo',    'Laptop',   1599.00,  8, 'Business ultrabook'),
('iPad Air',           'Apple',     'Tablet',    599.00, 30, '10.9-inch tablet'),
('Surface Pro 9',      'Microsoft', 'Tablet',   1099.00, 10, '2-in-1 Windows tablet'),
('WH-1000XM5',         'Sony',      'Audio',     349.99, 40, 'Noise-cancelling headphones'),
('AirPods Pro 2',      'Apple',     'Audio',     249.00, 55, 'Wireless earbuds with ANC'),
('Apple Watch S9',     'Apple',     'Wearable',  429.00, 22, 'Smartwatch with health tracking'),
('Fitbit Charge 6',    'Fitbit',    'Wearable',  159.95, 35, 'Fitness tracker band');