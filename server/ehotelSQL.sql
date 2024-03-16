CREATE TABLE HotelChain (
                            ChainID CHAR(5) NOT NULL UNIQUE,
                            Name VARCHAR(40) NOT NULL,
                            OfficeAddress VARCHAR(50) NOT NULL,
                            NumberOfHotels NUMERIC check (NumberOfHotels >= 0)  NOT NULL,
                            ContactEmail VARCHAR(40) NOT NULL UNIQUE,
                            PhoneNumber CHAR(10) NOT NULL UNIQUE,
                            PRIMARY KEY(ChainID)
);

CREATE TABLE Hotel (
                       HotelID CHAR(5) NOT NULL UNIQUE,
                       ChainID CHAR(5) NOT NULL,
                       Category INTEGER check ( Category>=1 and Category<=5 ) NOT NULL,
                       NumOfRooms NUMERIC check (NumOfRooms >= 0)  NOT NULL,
                       Address VARCHAR(50) NOT NULL,
                       ContactEmail VARCHAR(40) NOT NULL,
                       PhoneNumber CHAR(10) NOT NULL,
                       PRIMARY KEY (HotelID),
                       FOREIGN KEY (ChainID) REFERENCES HotelChain(ChainID) ON DELETE CASCADE
);

CREATE TABLE Room (
                      RoomID CHAR(5) NOT NULL UNIQUE,
                      HotelID CHAR(5) NOT NULL,
                      RoomNumber NUMERIC(20) NOT NULL,
                      Price NUMERIC(20) NOT NULL check (Price >= 0)  NOT NULL,
                      Amenities VARCHAR(100) NOT NULL,
                      Capacity NUMERIC(20) NOT NULL check (capacity > 0)  NOT NULL,
                      SeaView BOOLEAN NOT NULL,
                      MountainView BOOLEAN NOT NULL,
                      Extendable BOOLEAN NOT NULL,
                      Damages BOOLEAN NOT NULL,
                      PRIMARY KEY(RoomID),
                      FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE
);


CREATE TABLE Customer (
                          CustomerID SERIAL NOT NULL UNIQUE,
                          Email VARCHAR(40) NOT NULL UNIQUE,
                          Password VARCHAR(40) NOT NULL,
                          FullName VARCHAR(40) NOT NULL,
                          Address VARCHAR(50) NOT NULL,
                          SSN INT NOT NULL  CHECK( SSN BETWEEN 100000000 AND 999999999 ) UNIQUE,
                          DateOfRegistration DATE NOT NULL,
                          PRIMARY KEY(CustomerID)
);

CREATE TABLE Positions (
                           PositionID SERIAL NOT NULL UNIQUE,
                           PositionName VARCHAR(40) NOT NULL,
                           PRIMARY KEY (PositionID)
);

CREATE TABLE Employee (
                          EmployeeID SERIAL NOT NULL UNIQUE ,
                          Email VARCHAR(40) NOT NULL  ,
                          Password VARCHAR(40) NOT NULL,
                          HotelID CHAR(5) NOT NULL,
                          FullName VARCHAR(40) NOT NULL,
                          Address VARCHAR(50) NOT NULL,
                          SSN INT NOT NULL CHECK( SSN BETWEEN 100000000 AND 999999999 ) UNIQUE,
                          PRIMARY KEY (EmployeeID),
                          FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE

);
CREATE TABLE EmployeePosition (
                                  EmployeeID SERIAL NOT NULL,
                                  PositionID SERIAL NOT NULL,
                                  PRIMARY KEY (EmployeeID, PositionID),
                                  FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
                                  FOREIGN KEY (PositionID) REFERENCES Positions(PositionID) ON DELETE CASCADE
);
CREATE TABLE Renting (
                         RentingID SERIAL NOT NULL UNIQUE ,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         CheckinDate DATE NOT NULL,
                         CheckoutDate DATE NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY(RentingID),
                         FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
                         FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE RESTRICT ,
                         FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);


CREATE TABLE Archive (
                         ArchiveID SERIAL NOT NULL UNIQUE ,
                         IsBooking BOOLEAN NOT NULL,
                         ArchivedID CHAR(5) NOT NULL,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         BookingDate DATE, --can be null since rentings don't have booking dates
                         CheckinDate DATE NOT NULL,
                         CheckoutDate DATE NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY(ArchiveID)
);

CREATE TABLE Booking (
                         BookingID SERIAL NOT NULL UNIQUE ,
                         HotelID CHAR(5) NOT NULL,
                         RoomID CHAR(5) NOT NULL,
                         CustomerID SERIAL NOT NULL,
                         BookingDate DATE NOT NULL,
                         CheckinDate DATE NOT NULL,
                         CheckoutDate Date NOT NULL  check ( CheckoutDate > CheckinDate ),
                         PRIMARY KEY (BookingID),
                         FOREIGN KEY (HotelID) REFERENCES Hotel(HotelID) ON DELETE CASCADE,
                         FOREIGN KEY (RoomID) REFERENCES Room(RoomID) ON DELETE RESTRICT ,
                         FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);
CREATE TABLE Cities (
    City varchar(20) NOT NULL unique
);