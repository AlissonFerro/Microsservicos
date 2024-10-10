import mongoose from 'mongoose';

export default function connectDb() {
    const db = 'mongodb://127.0.0.1:27017/Users';
    
    mongoose.connect(db, { })
        .then(() => console.log(`connected to ${db}`));
}