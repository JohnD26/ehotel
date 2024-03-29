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
        const positions = await Position.bulkCreate(positionsData);

        console.log('Position inserted:', positions.map(position => position.toJSON()));

    } catch (error) {
        console.error('Error inserting positions:', error);
    }
}

module.exports = {createAll}