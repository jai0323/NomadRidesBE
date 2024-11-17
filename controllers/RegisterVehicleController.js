const db = require('../config/dbConn');

const RegisterBike = ({req, res}) => {
    const { registration_no, vendor_id, brand, model, registration_date, fuel_type, type, last_service_date, photo } = req.body;
    
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
        status: 'available'
    };

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
            photo TEXT,
            status VARCHAR(20) DEFAULT 'available',
            FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE
        )
    `;

    // Create the bike table if it doesn't exist
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.log("BikeSignupController.js line:21");
            console.log(err);
            return res.status(500).json({ msg: "Database error" });
        }

        // Check if registration number already exists
        db.query('SELECT * FROM bike WHERE registration_no = ?', [registration_no], async (err, results) => {
            if (err) {
                console.log("BikeSignupController.js line:29");
                console.log(err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Registration number already registered' });
            }

            const insertBikeQuery = `
                INSERT INTO bike (
                    registration_no, vendor_id, brand, model, registration_date, 
                    fuel_type, type, last_service_date, photo, status
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                bike.status
            ];

            db.query(insertBikeQuery, values, (err, result) => {
                if (err) {
                    console.log("RegisterBike line:78");
                    console.log(err);
                    return res.status(500).json({ msg: "Error inserting bike data" });
                }
                res.status(201).json({ msg: "Bike added successfully" });
            });
        });
    });
}


const RegisterCar = ({req, res}) => {
    const { registration_no, vendor_id, brand, model, registration_date, fuel_type, type, last_service_date, photo } = req.body;
    
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
            photo TEXT,
            status VARCHAR(20) DEFAULT 'available',
            FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE
        )
    `;

    // Create the bike table if it doesn't exist
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.log("BikeSignupController.js line:21");
            console.log(err);
            return res.status(500).json({ msg: "Database error" });
        }

        // Check if registration number already exists
        db.query('SELECT * FROM bike WHERE registration_no = ?', [registration_no], async (err, results) => {
            if (err) {
                console.log("BikeSignupController.js line:29");
                console.log(err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Registration number already registered' });
            }

            const insertBikeQuery = `
                INSERT INTO bike (
                    registration_no, vendor_id, brand, model, registration_date, 
                    fuel_type, type, last_service_date, photo, status
                ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                bike.status
            ];

            db.query(insertBikeQuery, values, (err, result) => {
                if (err) {
                    console.log("RegisterBike line:78");
                    console.log(err);
                    return res.status(500).json({ msg: "Error inserting bike data" });
                }
                res.status(201).json({ msg: "Bike added successfully" });
            });
        });
    });
}


module.exports = { RegisterBike, RegisterCar }



























// import React, { useState } from 'react';
// import axios from 'axios';

// const BikeRegistration = () => {
//     const [bikeDetails, setBikeDetails] = useState({
//         registration_no: '',
//         vendor_id: '',
//         brand: '',
//         model: '',
//         registration_date: '',
//         fuel_type: '',
//         type: '',
//         last_service_date: '',
//         photo: ''
//     });
//     const [imageFile, setImageFile] = useState(null);

//     // Update form inputs
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setBikeDetails(prevDetails => ({ ...prevDetails, [name]: value }));
//     };

//     // Handle image file selection and convert to Base64
//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         setImageFile(file);
        
//         if (file) {
//             const base64 = await toBase64(file);
//             setBikeDetails(prevDetails => ({ ...prevDetails, photo: base64 }));
//         }
//     };

//     // Convert image file to Base64
//     const toBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result.split(',')[1]); // Remove Base64 prefix
//             reader.onerror = error => reject(error);
//         });
//     };

//     // Submit form data
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:3000/add-bike', bikeDetails);
//             alert("Bike registered successfully!");
//             console.log(response.data);
//         } catch (error) {
//             console.error("Error registering bike:", error);
//             alert("Failed to register bike.");
//         }
//     };

//     return (
//         <div>
//             <h2>Bike Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Registration Number:</label>
//                 <input type="text" name="registration_no" value={bikeDetails.registration_no} onChange={handleInputChange} required />

//                 <label>Vendor ID:</label>
//                 <input type="text" name="vendor_id" value={bikeDetails.vendor_id} onChange={handleInputChange} required />

//                 <label>Brand:</label>
//                 <input type="text" name="brand" value={bikeDetails.brand} onChange={handleInputChange} />

//                 <label>Model:</label>
//                 <input type="text" name="model" value={bikeDetails.model} onChange={handleInputChange} />

//                 <label>Registration Date:</label>
//                 <input type="date" name="registration_date" value={bikeDetails.registration_date} onChange={handleInputChange} />

//                 <label>Fuel Type:</label>
//                 <input type="text" name="fuel_type" value={bikeDetails.fuel_type} onChange={handleInputChange} />

//                 <label>Type:</label>
//                 <input type="text" name="type" value={bikeDetails.type} onChange={handleInputChange} />

//                 <label>Last Service Date:</label>
//                 <input type="date" name="last_service_date" value={bikeDetails.last_service_date} onChange={handleInputChange} />

//                 <label>Photo:</label>
//                 <input type="file" accept="image/*" onChange={handleImageChange} />

//                 <button type="submit">Register Bike</button>
//             </form>
//         </div>
//     );
// };

// export default BikeRegistration;






// {imageFile && (
//     <div>
//         <h3>Image Preview:</h3>
//         <img src={`data:image/png;base64,${bikeDetails.photo}`} alt="Preview" style={{ width: '200px' }} />
//     </div>
// )}

