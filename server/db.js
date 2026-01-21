import mysql from 'mysql2/promise';
import 'dotenv/config';
const DB_PASSWORD = process.env.DB_PASSWORD ;
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'react_foundation',
    port: 3306
});

try {
    await connection.connect();
    console.log('Connected to database.');
} catch (err) {
    console.error('Database connection failed:', err);
}

export default connection;