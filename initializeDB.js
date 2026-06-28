const db = require('./db');

const createAdminTable = `
  CREATE TABLE IF NOT EXISTS admin_login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
  );
`;

const createSubscriptionsTable = `
  CREATE TABLE IF NOT EXISTS subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    buttonText VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    oldPrice DECIMAL(10, 2),
    discount INT,
    logo VARCHAR(255)
  );
`;

const initializeDB = async () => {
  try {
    await db.query(createAdminTable);
    console.log('Admin login table is ready or created.');

    await db.query(createSubscriptionsTable);
    console.log('Subscriptions table is ready or created.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDB();