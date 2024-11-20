const db = require('../config/dbConn');
const multer = require('multer');

const RegisterBike = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const uploadSingle = upload.single('photo'); // 'photo' matches the key in the multipart form data
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    uploadSingle(req, res, (err) => {
        if (err) {
            console.log("Error in file upload:", err);
            return res.status(500).json({ error: "Error uploading file" });
        }

        const { registration_no, vendor_id, brand, model, registration_date, fuel_type, type, last_service_date,amount } = req.body;

        // Convert the uploaded file to buffer
        const photo = req.file ? req.file.buffer : null;

        const bike = {
            registration_no,
            vendor_id,
            brand,
            model,
            registration_date,
            fuel_type,
            type,
            last_service_date,
            photo,
            amount:parseFloat(amount),
            status: 'available'
        };
        console.log("bike --- ",bike)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS bike (
                registration_no VARCHAR(50) NOT NULL PRIMARY KEY,
                vendor_id VARCHAR(36) NOT NULL,
                brand VARCHAR(50),
                model VARCHAR(50),
                registration_date DATE,
                fuel_type VARCHAR(20),
                type VARCHAR(50),
                last_service_date DATE,
                photo MEDIUMBLOB,
                status VARCHAR(20) DEFAULT 'available',
                amount FLOAT,
                FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE
            )
        `;

        // Create the bike table if it doesn't exist (consider running this in a separate setup file)
        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.log("Error creating table:", err);
                return res.status(500).json({ msg: "Database error during table creation" });
            }
            console.log("Table creation successful or already exists.");
            // Check if registration number already exists
            db.query('SELECT * FROM bike WHERE registration_no = ?', [registration_no], (err, results) => {
                if (err) {
                    console.log("Error checking registration number:", err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (results.length > 0) {
                    return res.status(400).json({ error: 'Registration number already registered' });
                }

                const insertBikeQuery = `
                    INSERT INTO bike (
                        registration_no, vendor_id, brand, model, registration_date, 
                        fuel_type, type, last_service_date, photo, status,amount
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `; 

                const values = [
                    bike.registration_no,
                    bike.vendor_id,
                    bike.brand,
                    bike.model,
                    bike.registration_date,
                    bike.fuel_type,
                    bike.type,
                    bike.last_service_date,
                    bike.photo,
                    bike.status,
                    bike.amount
                ];
                console.log(values)
                db.query(insertBikeQuery, values, (err, result) => {
                    if (err) {
                        console.log("Error inserting bike data:", err);
                        return res.status(500).json({ error: "Error inserting bike data" });
                    }
                    res.status(201).json({ message: "Bike added successfully" });
                });
            });
        });
    });
};


const RegisterCar = (req, res) => {
  
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const uploadSingle = upload.single('photo'); // 'photo' matches the key in the multipart form data
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    uploadSingle(req, res, (err) => {
        if (err) {
            console.log("Error in file upload:", err);
            return res.status(500).json({ error: "Error uploading file" });
        }
    const { registration_no, vendor_id, brand, model, registration_date, fuel_type, type, last_service_date, amount } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const car = {
        registration_no,
        vendor_id,
        brand,
        model,
        registration_date,
        fuel_type,
        type,
        last_service_date,
        photo,
        amount:parseFloat(amount),
        status: 'available'
    };

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS car (
            registration_no VARCHAR(50) NOT NULL UNIQUE,
            vendor_id VARCHAR(36) NOT NULL,
            brand VARCHAR(50),
            model VARCHAR(50),
            registration_date DATE,
            fuel_type VARCHAR(20),
            type VARCHAR(50),
            last_service_date DATE,
            photo MEDIUMBLOB,
            amount FLOAT,
            status VARCHAR(20) DEFAULT 'available',
            FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE
        )
    `;

    // Create the car table if it doesn't exist
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.log("RegisterCar line:21");
            console.log(err);
            return res.status(500).json({ msg: "Database error" });
        }
        console.log("Table creation successful or already exists.");
        // Check if registration number already exists in the car table
        db.query('SELECT * FROM car WHERE registration_no = ?', [registration_no], async (err, results) => {
            if (err) {
                console.log("RegisterCar line:29");
                console.log(err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Registration number already registered' });
            }

            const insertCarQuery = `
                INSERT INTO car (
                    registration_no, vendor_id, brand, model, registration_date, 
                    fuel_type, type, last_service_date, photo, status,amount
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                car.registration_no,
                car.vendor_id,
                car.brand,
                car.model,
                car.registration_date,
                car.fuel_type,
                car.type,
                car.last_service_date,
                car.photo,
                car.status,
                car.amount
            ];

            db.query(insertCarQuery, values, (err, result) => {
                if (err) {
                    console.log("RegisterCar line:78");
                    console.log(err);
                    return res.status(500).json({ error: "Error inserting car data" });
                }
                res.status(201).json({ message: "Car added successfully" });
            });
        });
    });
});
};


module.exports = { RegisterBike, RegisterCar }
