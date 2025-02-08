import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'node:path';
import * as fs from 'node:fs';

// Function to load and validate DB environment variables
export function loadDbEnv() {
    // Load db.env file
    const envPath = path.resolve(__dirname, './assets/db.env');
    if (!fs.existsSync(envPath)) {
        throw new Error('db.env file not found');
    }

    // Clear existing DB-related env vars before reloading
    const dbEnvPrefix = 'DB_';
    for (const key of Object.keys(process.env).filter(key => key.startsWith(dbEnvPrefix))) {
        delete process.env[key];
    }

    dotenv.config({ path: envPath });

    // Validate required environment variables
    const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}

// Initial load of environment variables
loadDbEnv();

// Create a PostgreSQL connection pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Connection pool configuration
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Create and export the drizzle client
export const db = drizzle(pool);