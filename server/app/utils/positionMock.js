async function createAll(sequelize, Position){
    try {
        const positionsData = [
            { name: 'clerk' },
            { name: 'receptionist' },
            { name: 'developer' },
            { name: 'house keeper' },
            { name: 'manager' },
            { name: 'HR represantative' }
        ];

        // Use bulkCreate to insert multiple records at once
        //const positions = await Position.bulkCreate(positionsData);

        const positions = await Promise.all(positionsData.map(async(position) => {
            await Position.findOrCreate({
                where: {name: position.name},
                defaults: position,
                logging: false

            })
        }))

        console.log('Position inserted:');

    } catch (error) {
        console.error('Error inserting positions:', error);
    }
}

module.exports = {createAll}