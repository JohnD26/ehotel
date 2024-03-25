const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

// Create a new Sequelize instance
const sequelize = new Sequelize('ehotel', 'postgres', '4505', {
    host: 'localhost',
    dialect: 'postgres',
});

const sqlScript = fs.readFileSync('../ehotelSQL.sql', 'utf8');
sequelize.query(sqlScript)
    .then(() => {
        console.log('Table creation script executed successfully.');
        // Start your server or perform any other operations that depend on the tables being created
    })
    .catch(err => {
        console.error('Error executing table creation script:', err);
    });

const HotelChain = sequelize.define('HotelChain', {
    chain_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
    tableName: 'hotel_chains', // Adjusted table name
    timestamps: false

});

const Hotel = sequelize.define('Hotel', {
    hotel_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chain_id: { type: DataTypes.INTEGER, allowNull: false },
    hname: { type: DataTypes.STRING(100), allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    phone_number: { type: DataTypes.STRING(20) },
    address: { type: DataTypes.STRING(255), allowNull: false },
    manager_id: { type: DataTypes.INTEGER },
    count_rating: { type: DataTypes.INTEGER, defaultValue: 1 },
    category: { type: DataTypes.STRING(50) }
}, {
    tableName: 'hotels', // Adjusted table name
    timestamps: false

});

const CentralOffice = sequelize.define('CentralOffice', {
    office_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chain_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    phone_number: { type: DataTypes.STRING(20) },
    address: { type: DataTypes.STRING(255), allowNull: false },
    office_name: { type: DataTypes.STRING(100) }
}, {
    tableName: 'central_office', // Adjusted table name
    timestamps: false
});

const Customer = sequelize.define('Customer', {
    customer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING(255), allowNull: false },
    last_name: { type: DataTypes.STRING(255), allowNull: false },
    sin: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    registration_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    phone_number: { type: DataTypes.STRING(20) },
    customer_address: { type: DataTypes.STRING(255) }
}, {
    tableName: 'customers', // Adjusted table name
    timestamps: false
});

const Employee = sequelize.define('Employee', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sin: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(50) },
    hotel_id: { type: DataTypes.INTEGER },
    employee_address: { type: DataTypes.STRING(255) }
}, {
    tableName: 'employees', // Adjusted table name
    timestamps: false

});

const Room = sequelize.define('Room', {
    room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hotel_id: { type: DataTypes.INTEGER, allowNull: false },
    room_number: { type: DataTypes.INTEGER, allowNull: false },
    room_type: { type: DataTypes.STRING(50) },
    capacity: { type: DataTypes.INTEGER },
    price_per_night: { type: DataTypes.DECIMAL(10, 2) },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    tableName: 'rooms', // Adjusted table name
    timestamps: false

});

const Booking = sequelize.define('Booking', {
    booking_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chain_id: { type: DataTypes.INTEGER, allowNull: false },
    hotel_id: { type: DataTypes.INTEGER, allowNull: false },
    room_number: { type: DataTypes.INTEGER },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING(50) },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    rated: { type: DataTypes.BOOLEAN, defaultValue: false },
    check_in: { type: DataTypes.DATE, allowNull: false },
    check_out: { type: DataTypes.DATE, allowNull: false }
}, {
    tableName: 'bookings', // Adjusted table name
    timestamps: false

});

const Amenity = sequelize.define('Amenity', {
    amenity_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amenity_name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
    tableName: 'amenities', // Adjusted table name
    timestamps: false

});

const RoomAmenity = sequelize.define('RoomAmenity', {
    room_id: { type: DataTypes.INTEGER, allowNull: false },
    amenity_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'room_amenities', // Adjusted table name
    timestamps: false

});

const View = sequelize.define('View', {
    view_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    view_type: { type: DataTypes.STRING(50) },
    room_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, {
    tableName: 'views', // Adjusted table name
    timestamps: false

});


View.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = {
    sequelize,
    HotelChain,
    Hotel,
    CentralOffice,
    Customer,
    Employee,
    Room,
    Booking,
    Amenity,
    RoomAmenity,
    View,
};