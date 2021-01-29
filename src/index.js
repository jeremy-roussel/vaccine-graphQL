require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

const sequelize = require("./db/sequelize");
const resolvers = require("./graphql/resolvers/index");
const baseTypes = require("./graphql/schema");
// const GuaranteeTypes = require("./graphql/modular_schemas/guarantee");
const expireGuarantees = require("./utils/expireGuarantees");
const createLocation = require("./utils/createLocation");
const createSlots = require("./utils/createSlots");

// const typeDefs = [baseTypes, GuaranteeTypes];
const typeDefs = baseTypes;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });

  await sequelize();

  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );

  app.get("/", function (req, res) {
    res.send("");
  });

  server.applyMiddleware({ app, path: "/graphql" });

  const httpServer = createServer(app);

  cron.schedule("* * * * *", expireGuarantees);

  const startDate = new Date();
  const numberofLocations = await createLocation();
  console.log(numberofLocations);
  await createSlots(5, startDate.setHours(8), 5);
  console.log("after createSlots");

  httpServer.listen({ port: process.env.PORT }, () =>
    console.log(`Server is running on port ${process.env.PORT}/graphql`)
  );
};

startServer().then();
