
import { Sequelize }  from 'sequelize';
import { createUserModel } from '../model/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Only for Render/Heroku-style SSL
        },
    },
});



let UserModel = null;
const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        UserModel = await createUserModel(sequelize);
        await sequelize.sync();
        console.log("Database synced");
        
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    connection,
    UserModel
}