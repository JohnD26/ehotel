const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
require('dotenv/config');
const { sequelize, Customer, Hotel, Chain, Room, City, Employee, Position} = require('./sequelize');
const fs = require('fs');

const chainMock = require("./utils/chainMock")
const hotelMock = require("./utils/hotelMock");
const roomMock = require("./utils/roomMock");
const positionMock = require("./utils/positionMock");
const citiesMock = require("./utils/citiesMock");
const employeeMock = require("./utils/employeMock");

module.exports = async (cb) => {
    const app = express();
    app.disable('x-powered-by');

    // Middleware
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(morgan('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));

    // Routes
    app.use('/api', api);
    app.use('*', (req, res) => res.status(404).end());

    // Connect to the database and start the server
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        //await sequelize.sync({ force: true, logging: false });
        //console.log('Database synchronized');

        //await chainMock.createAll(sequelize, Chain);
        //await hotelMock.createAll(sequelize, Hotel);
        //await roomMock.createAll(sequelize, Room);
        //await citiesMock.createAll(sequelize, City)
        //await employeeMock.createAll(sequelize, Employee)
        //await positionMock.createAll(sequelize, Position);

        // Create a customer (example)
        //const tables = await sequelize.getQueryInterface().showAllTables()
        //console.log('tables :', tables);

        console.log("Employee : ", (await Employee.findAll()).length);

        // Start the server
        const server = app.listen(process.env.PORT || 3001, () => cb && cb(server))

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
