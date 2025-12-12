import mongoose from "mongoose"

const DB_NAME = 'datastack'

let isConnected = false;

export const connectMongo = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URI, {
            dbName: DB_NAME,
        });
        isConnected = true;
        console.log('[MongoDB] Connected');
    } catch (error) {
        console.error('[MongoDB] Connection failed', error);
        throw error;
    }
};