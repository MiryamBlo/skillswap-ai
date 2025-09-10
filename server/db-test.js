require('dotenv').config();
console.log('DATABASE_URL from .env:', process.env.DATABASE_URL);

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for AWS RDS unless SSL disabled
});

client.connect()
    .then(() => {
        console.log('✅ Connected to PostgreSQL!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('🕒 Server time:', res.rows[0]);
    })
    .catch(err => {
        console.error('❌ Connection error details:');
        console.error('Name:', err.name);
        console.error('Code:', err.code);
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);
        console.error('Full error object:', err);
    })
    .finally(() => {
        client.end();
    });