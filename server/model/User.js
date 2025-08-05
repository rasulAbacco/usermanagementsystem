import { DataTypes } from 'sequelize';

export const createAuthUserModel = async (sequelize) => {
    const AuthUser = sequelize.define('AuthUser', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'auth_users'  // You can set a custom table name
    });

    return AuthUser;
};
