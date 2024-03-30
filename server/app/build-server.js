const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
require('dotenv/config');
const { sequelize, Customer, Hotel, Chain, Room, City, Employee, Position } = require('./sequelize');
const fs = require('fs');

const chainMock = require("./utils/chainMock");
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
        // Authenticate with the database
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync models with the database (if needed)
         //await sequelize.sync({ force: true, logging: false });
        // console.log('Database synchronized');

        // Create mock data (if needed)
        chainMock.createAll(sequelize, Chain)
            //.then(() => hotelMock.createAll(sequelize, Hotel)
                .then(() => roomMock.createAll(sequelize, Room)
                        .then(() => citiesMock.createAll(sequelize, City)
                            .then(() => employeeMock.createAll(sequelize, Employee)
                                .then(() => positionMock.createAll(sequelize, Position)))))


        // Log the number of employees
        console.log(" Chain:", (await Chain.findAll({logging: false})).length);
        console.log(" Hotel:", (await Hotel.findAll({logging: false})).length);
        console.log(" Room:", (await Room.findAll({logging: false})).length);
        console.log(" Cities:", (await City.findAll({logging: false})).length);
        console.log(" Employee:", (await Employee.findAll({logging: false})).length);
        console.log(" Position:", (await Position.findAll({logging: false})).length);

        // Start the server
        const server = app.listen(process.env.PORT || 3001, () => {
            console.log(`Server is running on port ${server.address().port}`);
            if (cb) cb(server);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
