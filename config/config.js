const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/mernproject"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
