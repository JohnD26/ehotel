const { Sequelize, DataTypes } = require('sequelize');
// Create a new Sequelize instance
const sequelize = new Sequelize('ehotel', 'postgres', '4505', {
    host: 'localhost',
    dialect: 'postgres',
});

const Chain = sequelize.define('Chain', {
    chain_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chain_name: { type: DataTypes.STRING(255), allowNull: false },
    headquarters_address: { type: DataTypes.STRING(255), allowNull: false },
    contact_email: { type: DataTypes.STRING(255), allowNull: false },
    contact_phone: { type: DataTypes.STRING(20), allowNull: false }
});

// Hôtel
const Hotel = sequelize.define('Hotel', {
    hotel_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chain_id: { type: DataTypes.INTEGER, allowNull: false },
    hotel_name: { type: DataTypes.STRING(255), allowNull: false },
    hotel_address: { type: DataTypes.STRING(255), allowNull: false },
    contact_email: { type: DataTypes.STRING(255), allowNull: false },
    contact_phone: { type: DataTypes.STRING(20), allowNull: false },
    stars: { type: DataTypes.INTEGER, allowNull: false },
    sea_view: { type: DataTypes.BOOLEAN, allowNull: false },
    mountain_view: { type: DataTypes.BOOLEAN, allowNull: false },
    extendable: { type: DataTypes.BOOLEAN, allowNull: false },
});

// Define the City model
const City = sequelize.define('City', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

// Define the Position model
const Position = sequelize.define('Position', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

// Chambre
const Room = sequelize.define('Room', {
    room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hotel_id: { type: DataTypes.INTEGER, allowNull: false },
    room_number: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    capacity: { type: DataTypes.STRING(50), allowNull: false },
    hasBalcony: { type: DataTypes.BOOLEAN, allowNull: false },
    hasMinibar: { type: DataTypes.BOOLEAN, allowNull: false },
    hasWiFi: { type: DataTypes.BOOLEAN, allowNull: false },
    hasTV: { type: DataTypes.BOOLEAN, allowNull: false },
    issues: { type: DataTypes.STRING(255) , allowNull: true}
});

// Client
const Customer = sequelize.define('Customer', {
    customer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.STRING(255), allowNull: false },
    social_security_number: { type: DataTypes.STRING(20), allowNull: false },
    registration_date: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
});

// Employé
const Employee = sequelize.define('Employee', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(255), allowNull: false },
    address: { type: DataTypes.STRING(255), allowNull: false },
    social_security_number: { type: DataTypes.STRING(20), allowNull: false },
    role: { type: DataTypes.STRING(100), allowNull: true },
    hotel_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false },
});

// Réservation
const Reservation = sequelize.define('Reservation', {
    reservation_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    room_id: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    is_checked_in: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
});

Chain.hasMany(Hotel, { foreignKey: 'chain_id' });
Hotel.belongsTo(Chain, { foreignKey: 'chain_id' });

Hotel.hasMany(Room, { foreignKey: 'hotel_id' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(Employee, { foreignKey: 'hotel_id' });
Employee.belongsTo(Hotel, { foreignKey: 'hotel_id', onDelete: 'CASCADE' }); // Added onDelete option to cascade delete related employees when a hotel is deleted

Customer.hasMany(Reservation, { foreignKey: 'customer_id' });
Reservation.belongsTo(Customer, { foreignKey: 'customer_id' });

Room.hasMany(Reservation, { foreignKey: 'room_id' });
Reservation.belongsTo(Room, { foreignKey: 'room_id' });

module.exports = { sequelize, Chain, Hotel, Room, Customer, Employee, Reservation, City, Position };
