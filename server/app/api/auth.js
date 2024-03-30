const {Router} = require('express')
const {Customer} = require('../sequelize')
const bcrypt = require('bcryptjs')
const router = new Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the customer by email
        const user = await Customer.findOne({ where: { email } });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                res.json({ message: "Login successful", user: user });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
})

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, sin, phoneNumber, customerAddress } = req.body;
    try {
        const existingUser = await Customer.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Customer.create({
            email,
            password: hashedPassword,
            first_name: firstName,
            last_name: lastName,
            sin,
            phone_number: phoneNumber,
            customer_address: customerAddress
        }, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        res.status(201).json({ message: "Registration successful", user: newUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error during registration." });
    }
});

module.exports = router