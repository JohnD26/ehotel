async function createAll(sequelize, Employee){
    try {
        const employeesData = [
            { email: 'employee1@admin.com', password: '12345', social_security_number: 123349846, full_name: 'Asad Ahmed', address: '143 Jonathon St', hotel_id: '11001' },
            { email: 'employee2@admin.com', password: '12345', social_security_number: 562349846, full_name: 'Fatima Khan', address: '143 Jonathon St', hotel_id: '11002' },
            { email: 'employee3@admin.com', password: '12345', social_security_number: 263349846, full_name: 'Youssef Belhaj', address: '143 Jonathon St', hotel_id: '11003' },
            { email: 'employee4@admin.com', password: '12345', social_security_number: 563349246, full_name: 'Ivan Petrov', address: '143 Jonathon St', hotel_id: '11004' },
            { email: 'employee5@admin.com', password: '12345', social_security_number: 566349846, full_name: 'Elena Ivanova', address: '143 Jonathon St', hotel_id: '11005' },
            { email: 'employee6@admin.com', password: '12345', social_security_number: 563349646, full_name: 'Pedro Hernandez', address: '143 Jonathon St', hotel_id: '11006' },
            { email: 'employee7@admin.com', password: '12345', social_security_number: 563369846, full_name: 'Yan Li', address: '143 Jonathon St', hotel_id: '11007' },
            { email: 'employee8@admin.com', password: '12345', social_security_number: 663349846, full_name: 'Ying Yang', address: '143 Jonathon St', hotel_id: '11008' },
            { email: 'employee9@admin.com', password: '12345', social_security_number: 563348846, full_name: 'Mehreen Hassan', address: '143 Jonathon St', hotel_id: '12001' },
            { email: 'employee10@admin.com', password: '12345', social_security_number: 163349846, full_name: 'Rabia Malik', address: '143 Jonathon St', hotel_id: '12002' },
            { email: 'employee11@admin.com', password: '12345', social_security_number: 263349847, full_name: 'Hicham Benali', address: '143 Jonathon St', hotel_id: '12003' },
            { email: 'employee12@admin.com', password: '12345', social_security_number: 363349846, full_name: 'Svetlana Kuznetsova', address: '143 Jonathon St', hotel_id: '12004' },
            { email: 'employee13@admin.com', password: '12345', social_security_number: 463349846, full_name: 'Carlos Martinez', address: '143 Jonathon St', hotel_id: '12005' },
            { email: 'employee14@admin.com', password: '12345', social_security_number: 763349846, full_name: 'Wei Zhang', address: '143 Jonathon St', hotel_id: '12006' },
            { email: 'employee15@admin.com', password: '12345', social_security_number: 863349846, full_name: 'Xin Chen', address: '143 Jonathon St', hotel_id: '12007' },
            { email: 'employee16@admin.com', password: '12345', social_security_number: 943349846, full_name: 'Yuliya Kozlova', address: '143 Jonathon St', hotel_id: '12008' },
            { email: 'employee17@admin.com', password: '12345', social_security_number: 573349846, full_name: 'Ali Khan', address: '143 Jonathon St', hotel_id: '13001' },
            { email: 'employee18@admin.com', password: '12345', social_security_number: 583349846, full_name: 'Zainab Malik', address: '143 Jonathon St', hotel_id: '13002' },
            { email: 'employee19@admin.com', password: '12345', social_security_number: 593349846, full_name: 'Amine Moussaoui', address: '143 Jonathon St', hotel_id: '13003' },
            { email: 'employee20@admin.com', password: '12345', social_security_number: 513349846, full_name: 'Luis Hernandez', address: '143 Jonathon St', hotel_id: '13004' },
            { email: 'employee21@admin.com', password: '12345', social_security_number: 523349846, full_name: 'Nova Stardust', address: '143 Jonathon St', hotel_id: '13005' },
            { email: 'employee22@admin.com', password: '12345', social_security_number: 561349846, full_name: 'Xander Phoenix', address: '143 Jonathon St', hotel_id: '13006' },
            { email: 'employee23@admin.com', password: '12345', social_security_number: 262349846, full_name: 'Luna Eclipse', address: '143 Jonathon St', hotel_id: '13007' },
            { email: 'employee24@admin.com', password: '12345', social_security_number: 563349846, full_name: 'Jaxon Thunder', address: '143 Jonathon St', hotel_id: '13008' },
            { email: 'employee25@admin.com', password: '12345', social_security_number: 564349846, full_name: 'Aria Sky', address: '143 Jonathon St', hotel_id: '14001' },
            { email: 'employee26@admin.com', password: '12345', social_security_number: 565349846, full_name: 'Orion Blaze', address: '143 Jonathon St', hotel_id: '14002' },
            { email: 'employee27@admin.com', password: '12345', social_security_number: 563498476, full_name: 'Aurora Borealis', address: '143 Jonathon St', hotel_id: '14003' },
            { email: 'employee28@admin.com', password: '12345', social_security_number: 567334984, full_name: 'Phoenix Fire', address: '143 Jonathon St', hotel_id: '14004' },
            { email: 'employee29@admin.com', password: '12345', social_security_number: 568329846, full_name: 'Zephyr Wind', address: '143 Jonathon St', hotel_id: '14005' },
            { email: 'employee30@admin.com', password: '12345', social_security_number: 569319846, full_name: 'Cassius Nightshade', address: '143 Jonathon St', hotel_id: '14006' },
            { email: 'employee31@admin.com', password: '12345', social_security_number: 563339847, full_name: 'Hamid Mcgee', address: '143 Jonathon St', hotel_id: '14007' },
            { email: 'employee32@admin.com', password: '12345', social_security_number: 563349848, full_name: 'Jonathon Bravo', address: '143 Jonathon St', hotel_id: '14008' },
            { email: 'employee33@admin.com', password: '12345', social_security_number: 563359849, full_name: 'Sad Johnny', address: '143 Jonathon St', hotel_id: '15001' },
            { email: 'employee34@admin.com', password: '12345', social_security_number: 563369841, full_name: 'Happy Johnny', address: '143 Jonathon St', hotel_id: '15002' },
            { email: 'employee35@admin.com', password: '12345', social_security_number: 563379842, full_name: 'Maid Luna', address: '143 Jonathon St', hotel_id: '15003' },
            { email: 'employee36@admin.com', password: '12345', social_security_number: 563389543, full_name: 'Experience Blaze', address: '143 Jonathon St', hotel_id: '15004' },
            { email: 'employee37@admin.com', password: '12345', social_security_number: 563399444, full_name: 'Sandstorm Boomie', address: '143 Jonathon St', hotel_id: '15005' },
            { email: 'employee38@admin.com', password: '12345', social_security_number: 563349344, full_name: 'Geegee Enthusiast', address: '143 Jonathon St', hotel_id: '15006' },
            { email: 'employee39@admin.com', password: '12345', social_security_number: 563319244, full_name: 'James Charles', address: '143 Jonathon St', hotel_id: '15007' },
            { email: 'employee40@admin.com', password: '12345', social_security_number: 563349144, full_name: 'Raj Tajmahal', address: '143 Jonathon St', hotel_id: '15008' },
        ];

        // Use bulkCreate to insert multiple records at once
        //const employees = await Employee.bulkCreate(employeesData);

        const employees = await Promise.all(employeesData.map(async(employee) => {
            await Employee.findOrCreate({
                where: {email: employee.email},
                defaults: employee,
                logging: false
            })
        }))

        console.log('Employee inserted:');

    } catch (error) {
        console.error('Error inserting employees:', error);
    }
}

module.exports = {createAll}