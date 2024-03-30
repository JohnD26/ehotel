
async function createAll(sequelize, Chain){
    try {
        const chainsData = [
            { chain_id: '00001', chain_name: 'Marriott', headquarters_address: '456 Main Ave, Portland, USA 97209', contact_email: 'contact@marriot.com', contact_phone: '5409823547' },
            { chain_id: '00002', chain_name: 'Hilton', headquarters_address: '16 Hawk Lane, Chicago, USA, 39427', contact_email: 'hello@hilton.com', contact_phone: '6236306193' },
            { chain_id: '00003', chain_name: 'Fairmont', headquarters_address: '173 Romane St, New York, USA, 92649', contact_email: 'fairmont@contact.com', contact_phone: '3432003847' },
            { chain_id: '00004', chain_name: 'Galaxy', headquarters_address: '73 Fairy St, Miami, USA 33130', contact_email: 'galaxy@fly.com', contact_phone: '3045849385' },
            { chain_id: '00005', chain_name: 'Refresh Resort', headquarters_address: '1 Heavenly St, Charleston, USA 29403', contact_email: 'contact@refresh.com', contact_phone: '3035849385' }
        ];

        // Use bulkCreate to insert multiple records at once
        //const chains = await Chain.bulkCreate(chainsData);

        const chains = await Promise.all(chainsData.map(async (chain) => {
            await Chain.findOrCreate({
                where: {chain_id: chain.chain_id},
                defaults: chain,
                logging: false

            })
        }))

        console.log('Chains inserted:');

    } catch (error) {
        console.error('Error inserting chains:', error);
    }
}

module.exports = {createAll}