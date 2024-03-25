--Data source already configured in the ehotelsuppport.json
--This was added as illustration just for quality
--We are connected to the port in the ehotelsupport.json

-- Chains
CREATE TABLE IF NOT EXISTS hotel_chains (
                              chain_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                              name VARCHAR(100) UNIQUE NOT NULL
);


-- Hotels
CREATE TABLE IF NOT EXISTS hotels (
                        hotel_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                        chain_id INTEGER NOT NULL,
                        hname VARCHAR(100) NOT NULL,
                        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                        email VARCHAR(255) UNIQUE NOT NULL,
                        phone_number VARCHAR(20),
                        address VARCHAR(255) NOT NULL,
                        manager_id INTEGER,
                        count_rating INTEGER DEFAULT 1,
                        category VARCHAR(50),
                        FOREIGN KEY (chain_id) REFERENCES hotel_chains(chain_id) -- Adding FK
);





-- Central Office
CREATE TABLE IF NOT EXISTS central_office (
                                office_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                                chain_id INTEGER NOT NULL,
                                email VARCHAR(255) UNIQUE NOT NULL,
                                phone_number VARCHAR(20),
                                address VARCHAR(255) NOT NULL,
                                office_name VARCHAR(100)
);



-- Customers
CREATE TABLE IF NOT EXISTS customers (
                           customer_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                           first_name VARCHAR(255) NOT NULL,
                           last_name VARCHAR(255) NOT NULL,
                           sin VARCHAR(15) UNIQUE NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           password VARCHAR(100) NOT NULL,
                           registration_date DATE DEFAULT CURRENT_DATE,
                           phone_number VARCHAR(20),
                           customer_address VARCHAR(255)
);

-- Employees
CREATE TABLE IF NOT EXISTS employees (
                           employee_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                           sin VARCHAR(15) UNIQUE NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           password VARCHAR(100) NOT NULL,
                           role VARCHAR(50),
                           hotel_id INTEGER,
                           employee_address VARCHAR(255),
                           FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id) -- Adding foreign key
);


--Rooms
CREATE TABLE IF NOT EXISTS rooms (
                                     room_id SERIAL PRIMARY KEY,
                                     hotel_id INTEGER NOT NULL,
                                     room_number INTEGER NOT NULL,
                                     room_type VARCHAR(50), -- 'Single' or 'Double' if needed
                                     capacity INTEGER,
                                     price_per_night DECIMAL(10,2),
                                     availability BOOLEAN DEFAULT TRUE,
                                     category VARCHAR(50), -- Luxurious, standard or economic
                                     FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id)
    );



-- Reservation
CREATE TABLE IF NOT EXISTS bookings (
                          booking_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                          chain_id INTEGER NOT NULL,
                          hotel_id INTEGER NOT NULL,
                          room_number INTEGER, -- room numbers are integers
                          customer_id INTEGER NOT NULL,
                          status VARCHAR(50),
                          active BOOLEAN DEFAULT TRUE,
                          rated BOOLEAN DEFAULT FALSE,
                          check_in DATE NOT NULL,
                          check_out DATE NOT NULL,
                          FOREIGN KEY (chain_id) REFERENCES hotel_chains(chain_id),
                          FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id),
                          FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);




CREATE TABLE IF NOT EXISTS amenities (
                           amenity_id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
                           amenity_name VARCHAR(100) UNIQUE NOT NULL
);



CREATE TABLE IF NOT EXISTS room_amenities (
                                room_id INTEGER NOT NULL,
                                amenity_id INTEGER NOT NULL,
                                FOREIGN KEY (room_id) REFERENCES rooms(room_id),
                                FOREIGN KEY (amenity_id) REFERENCES amenities(amenity_id),
                                PRIMARY KEY (room_id, amenity_id) -- Composite primary key
);


CREATE TABLE  IF NOT EXISTS views (

    --these are views for the rooms
                       view_id SERIAL PRIMARY KEY,
                       view_type VARCHAR(50),
                       room_id INTEGER NOT NULL,
                       FOREIGN KEY (room_id) REFERENCES rooms(room_id),
                       UNIQUE (room_id) -- Ensures a room has only one associated view
);

