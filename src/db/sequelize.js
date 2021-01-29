const Sequelize = require("sequelize");
// import path from "path";
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

module.exports = async () => {
  const sequelize = await new Sequelize(process.env.SQL_CONNECTION_URL, {
    define: {
      timestamps: false,
    },
    dialect: "postgres",
    models: [__dirname + "/models"],
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

// export default sequelize;
