const db = require('../config/dbConn');
const SignupCustomer = require('../util/CustomerSignup');
const SignupVendor = require('../util/VendorSignup');

const CustomerSignup = async (req, res) => {
    const { phone, email, name, password } = req.body;
    console.log(phone, email, name, password)
    const customer = {
        name: name,
        phone: phone,
        email: email,
        password: password,
    }

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS customer (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            phone VARCHAR(20) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            license VARCHAR(50),
            aadhaar VARCHAR(50),
            kyc_status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.log("GetOTPController.js line:21");
            console.log(err);
            return res.status(500).json({ msg: "Database error" });
        }

        db.query('SELECT * FROM customer WHERE phone = ? OR email= ?', [phone, email], async (err, results) => {

            if (err) {
                console.log("GetOTPController.js line:29");
                console.log(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            if (results.length > 0 && results[0].phone == phone) {
                res.status(400).json({ error: 'Phone number already registered' });
                return;
            }

            else if (results.length > 0 ) {
                res.status(400).json({ error: 'Email already registered' });
                return;
            }

           //calling customer signup function to save details in database
            SignupCustomer(customer,res);
               
        });
    });
}


const VendorSignup = async (req, res) => {
    const { phone, email, name, password, address, city } = req.body;
    const vendor = {
        name,
        phone,
        email,
        password,
        city,
        address
    }
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS vendor (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            phone VARCHAR(20) NOT NULL UNIQUE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            license VARCHAR(50),
            pan VARCHAR(50),
            address VARCHAR(255),
            city VARCHAR(100),
            kyc_status VARCHAR(50) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.log("GetOTPController.js line:21");
            console.log(err);
            return res.status(500).json({ msg: "Database error" });
        }

        db.query('SELECT * FROM vendor WHERE phone = ? OR email= ?', [phone, email], async (err, results) => {

            if (err) {
                console.log("GetOTPController.js line:29");
                console.log(err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            if (results.length > 0 && results[0].phone == phone) {
                res.status(400).json({ error: 'Phone number already registered' });
                return;
            }

            else if (results.length > 0 ) {
                res.status(400).json({ error: 'Email already registered' });
                return;
            }

            //calling vendor signup function to save details in database
            SignupVendor(vendor, res);
               
        });
    });
}

module.exports = { CustomerSignup, VendorSignup };