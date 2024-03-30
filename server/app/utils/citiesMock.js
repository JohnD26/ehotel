async function createAll(sequelize, City){
    try {
        const citiesData = [
            { name: 'Atlanta' },
            { name: 'Austin' },
            { name: 'Beverly Hills' },
            { name: 'Boston' },
            { name: 'Charleston' },
            { name: 'Chicago' },
            { name: 'Denver' },
            { name: 'Hollywood' },
            { name: 'Los Angeles' },
            { name: 'Miami' },
            { name: 'New York' },
            { name: 'Philadelphia' },
            { name: 'Portland' },
            { name: 'San Diego' },
            { name: 'San Francisco' },
            { name: 'Seattle' },
            { name: 'Sherman Oaks' },
            { name: 'Springfield' },
            { name: 'Santa Monica' },
            { name: 'Pasadena' },
            { name: 'Burbank' },
            { name: 'Malibu' },
            { name: 'Chatsworth' },
            { name: 'Downey' },
            { name: 'Santa Clarita' },
            { name: 'San Pedro' }
        ];

        // Use bulkCreate to insert multiple records at once
        //const cities = await City.bulkCreate(citiesData);

        const cities = await Promise.all(citiesData.map(async(city) => {
            await City.findOrCreate({
                where: {name: city.name},
                defaults: city,
                logging: false

            })
        }))

        console.log('City inserted:');

    } catch (error) {
        console.error('Error inserting cities:', error);
    }
}

module.exports = {createAll}