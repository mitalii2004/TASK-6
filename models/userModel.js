module.exports = (Sequelize, sequelize, DataTyes) => {
    return sequelize.define(
        "users",
        {
            ...require("./cors")(Sequelize, DataTyes),
            name: {
                type: DataTyes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: DataTyes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            password: {
                type: DataTyes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            phoneNumber: {
                type: DataTyes.STRING(255),
                allowNull: true,
                defaultValue: null,
            },
            profilePic: {
                type: DataTyes.STRING(255),
                allowNull: false,
            },
        },
        {
            tableName: "users",
        }
    );
};
