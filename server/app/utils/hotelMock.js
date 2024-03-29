async function createAll(sequelize, Hotel){
    try {
        const hotelsData = [
            // Marriott
            { hotel_id: '11001', chain_id: '00001', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '123 Main St, Springfield, USA 62704', contact_email: 'contactspring@marriot.com', contact_phone: '5551234567', hotel_name: 'Sunset Mirage Resort' },
            { hotel_id: '11002', chain_id: '00001', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '456 Oak Ave, Portland, USA 97209', contact_email: 'contactoak@marriot.com', contact_phone: '5552345678', hotel_name: 'Tranquil Haven Inn' },
            { hotel_id: '11003', chain_id: '00001', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '789 Elm St, Charleston, USA 29403', contact_email: 'contactelm@marriot.com', contact_phone: '5553456789' , hotel_name: 'Serenity Springs Lodge'},
            { hotel_id: '11004', chain_id: '00001', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '321 Maple Dr, Austin, USA 78753', contact_email: 'contactmaple@marriot.com', contact_phone: '5554567890' , hotel_name: 'Emerald Bay Hotel'},
            { hotel_id: '11005', chain_id: '00001', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '987 Pine St, Miami, USA 33130', contact_email: 'contactpine@marriot.com', contact_phone: '5555678901', hotel_name: 'Whispering Pines Retreat' },
            { hotel_id: '11006', chain_id: '00001', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '2468 Market St, San Francisco, USA 94114', contact_email: 'contactmarket@marriot.com', contact_phone: '5556789012', hotel_name: 'Coastal Breeze Inn' },
            { hotel_id: '11007', chain_id: '00001', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '1357 Broadway, New York, USA 10018', contact_email: 'contactbroadway@marriot.com', contact_phone: '5557890123' , hotel_name: 'Pinecrest Lodge'},
            { hotel_id: '11008', chain_id: '00001', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '3699 Wilshire Blvd, Los Angeles, USA 90010', contact_email: 'contactwilshire@marriot.com', contact_phone: '5558901234', hotel_name: 'Harborview Hotel' },

            // Hilton
            { hotel_id: '12001', chain_id: '00002', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '2345 Cherry Lane, Seattle, USA 98101', contact_email: 'hellocherry@hilton.com', contact_phone: '5551234568', hotel_name: 'Mountain Crest Chalet' },
            { hotel_id: '12002', chain_id: '00002', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '6789 Oakwood Dr, Denver, USA 80209', contact_email: 'hellooakwood@hilton.com', contact_phone: '5552345679', hotel_name: 'Starlight Oasis Resort' },
            { hotel_id: '12003', chain_id: '00002', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '1111 Peachtree St, Atlanta, USA 30309', contact_email: 'hellopeachtree@hilton.com', contact_phone: '5553456790' , hotel_name: 'Ocean Vista Inn'},
            { hotel_id: '12004', chain_id: '00002', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '2222 Walnut St, Philadelphia, USA 19103', contact_email: 'hellowalnut@hilton.com', contact_phone: '5554567891', hotel_name: 'Whispering Pines Retreat' },
            { hotel_id: '12005', chain_id: '00002', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '3333 State St, Chicago, USA 60610', contact_email: 'hellostate@hilton.com', contact_phone: '5555678902', hotel_name: 'Coastal Breeze Inn' },
            { hotel_id: '12006', chain_id: '00002', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '4444 Market St, San Diego, USA 92102', contact_email: 'hellomarket@hilton.com', contact_phone: '5556789013' , hotel_name: 'Pinecrest Lodge'},
            { hotel_id: '12007', chain_id: '00002', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '5555 Sunset Blvd, Hollywood, USA 90028', contact_email: 'info@hotel7.com', contact_phone: '5557890124' , hotel_name: 'Harborview Hotel'},
            { hotel_id: '12008', chain_id: '00002', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '6666 Lombard St, San Francisco, USA 94111', contact_email: 'hellolombard@hilton.com', contact_phone: '5556789013', hotel_name: 'Alpine Meadows Lodge' },

// Fairmont
            { hotel_id: '13001', chain_id: '00003', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '7777 Central Park, New York, USA 10019', contact_email: 'fairmontcentral@contact.com', contact_phone: '5551234569', hotel_name: 'Sunrise Summit Hotel' },
            { hotel_id: '13002', chain_id: '00003', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '8888 Rodeo Dr, Beverly Hills, USA 90210', contact_email: 'fairmontrodeo@contact.com', contact_phone: '5552345680', hotel_name: 'Alpine Meadows Lodge' },
            { hotel_id: '13003', chain_id: '00003', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '9999 Huntington Ave, Boston, USA 02115', contact_email: 'fairmonthuntington@contact.com', contact_phone: '5553456791', hotel_name: 'Valley View Lodge' },
            { hotel_id: '13004', chain_id: '00003', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '10000 Lincoln Ave, Miami, USA 33139', contact_email: 'fairmontlincoln@contact.com', contact_phone: '5554567892', hotel_name: 'Crystal Waters Inn' },
            { hotel_id: '13005', chain_id: '00003', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '11000 Melrose Ave, Los Angeles, USA 90048', contact_email: 'fairmontmelrose@contact.com', contact_phone: '5555678903', hotel_name: 'Seaside Serenade Resort' },
            { hotel_id: '13006', chain_id: '00003', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '12000 Ventura Blvd, Sherman Oaks, USA 91423', contact_email: 'fairmontventura@contact.com', contact_phone: '5556789014', hotel_name: 'Cedarwood Chalet' },
            { hotel_id: '13007', chain_id: '00003', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '13000 Sunset Blvd, Hollywood, USA 90027', contact_email: 'fairmontsunset@contact.com', contact_phone: '5557890125', hotel_name: 'Moonlight Bay Resort' },
            { hotel_id: '13008', chain_id: '00003', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '14000 Wilshire Blvd, Beverly Hills, USA 90212', contact_email: 'fairmontwilhshire@contact.com', contact_phone: '5558901236' , hotel_name: 'Mountain Crest Chalet'},

// Galaxy
            { hotel_id: '14001', chain_id: '00004', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '15000 Santa Monica Blvd, Los Angeles, USA 90035', contact_email: 'galaxysantamonica@fly.com', contact_phone: '5551234570' , hotel_name: 'Whispering Oaks Lodge'},
            { hotel_id: '14002', chain_id: '00004', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '16000 Pico Blvd, Santa Monica, USA 90405', contact_email: 'galaxypico@fly.com', contact_phone: '5552345681' , hotel_name: 'Azure Waters Inn'},
            { hotel_id: '14003', chain_id: '00004', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '17000 Colorado Blvd, Pasadena, USA 91106', contact_email: 'galaxycolorado@fly.com', contact_phone: '5553456792' , hotel_name: 'Sunset Ridge Hotel'},
            { hotel_id: '14004', chain_id: '00004', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '18000 Mulholland Dr, Los Angeles, USA 90272', contact_email: 'galaxymulholland@fly.com', contact_phone: '5554567893', hotel_name: 'Tranquil Haven Inn' },
            { hotel_id: '14005', chain_id: '00004', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '19000 Magnolia Blvd, Burbank, USA 91505', contact_email: 'galaxymagnolia@fly.com', contact_phone: '5555678904' , hotel_name: 'Golden Gate Hotel'},
            { hotel_id: '14006', chain_id: '00004', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '20000 Pacific Coast Hwy, Malibu, USA 90265', contact_email: 'galaxypacificcoast@fly.com', contact_phone: '5556789015' , hotel_name: 'Mountain Majesty Chalet'},
            { hotel_id: '14007', chain_id: '00004', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '21000 Topanga Canyon Blvd, Chatsworth, USA 91311', contact_email: 'galaxytopangacanyon@fly.com', contact_phone: '5557890126' , hotel_name: 'Enchanted Forest Lodge'},
            { hotel_id: '14008', chain_id: '00004', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '22000 S Figueroa St, Los Angeles, USA 90007', contact_email: 'galaxyfigueroa@fly.com', contact_phone: '5558907382' , hotel_name: 'Aspen Ridge Resort'},

// Refresh Resort
            { hotel_id: '15001', chain_id: '00005', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '7666 Central Park, New York, USA 10019', contact_email: 'contactcarson@refresh.com', contact_phone: '5551234571' , hotel_name: 'Whispering Sands Retreat'},
            { hotel_id: '15002', chain_id: '00005', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '24000 Imperial Hwy, Downey, USA 90242', contact_email: 'contactimperial@refresh.com', contact_phone: '5552345682' , hotel_name: 'Valley View Lodge'},
            { hotel_id: '15003', chain_id: '00005', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '25000 San Fernando Rd, Santa Clarita, USA 91321', contact_email: 'contactsanfernando@refresh.com', contact_phone: '5553456793', hotel_name: 'Sunrise Shores Resort' },
            { hotel_id: '15004', chain_id: '00005', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '26000 N Western Ave, San Pedro, USA 90731', contact_email: 'contactwestern@refresh.com', contact_phone: '5554567894', hotel_name: 'Tranquil Waters Inn' },
            { hotel_id: '15005', chain_id: '00005', stars: 3, sea_view: false, mountain_view: false, extendable: false, hotel_address: '27000 E Washington Blvd, Pasadena, USA 91107', contact_email: 'contactwashington@refresh.com', contact_phone: '5555678905' , hotel_name: 'Sunset Mirage Resort'},
            { hotel_id: '15006', chain_id: '00005', stars: 4, sea_view: false, mountain_view: false, extendable: false, hotel_address: '28000 Olympic Blvd, Santa Monica, USA 90404', contact_email: 'contactolympic@refresh.com', contact_phone: '5556789016' , hotel_name: 'Crystal Waters Inn'},
            { hotel_id: '15007', chain_id: '00005', stars: 2, sea_view: false, mountain_view: false, extendable: false, hotel_address: '29000 Van Nuys Blvd, Sherman Oaks, USA 91403', contact_email: 'contactvannuys@refresh.com', contact_phone: '5557890127' , hotel_name: 'Sunset Ridge Hotel'},
            { hotel_id: '15008', chain_id: '00005', stars: 5, sea_view: false, mountain_view: false, extendable: false, hotel_address: '30000 Beverly Blvd, Los Angeles, USA 90048', contact_email: 'contactbeverly@refresh.com', contact_phone: '5558901234' , hotel_name: 'Tranquil Haven Inn'}
        ];

        // Bulk insert hotels data
        await Hotel.bulkCreate(hotelsData);

        console.log('Hotels data inserted successfully.');
    } catch (error) {
        console.error('Error inserting hotels data:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
    }
}

module.exports = {createAll}