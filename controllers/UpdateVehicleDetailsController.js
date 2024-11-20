const db = require('../config/dbConn');
const multer = require('multer');

const UpdateBike = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const uploadSingle = upload.single('photo'); // 'photo' matches the key in the multipart form data

    uploadSingle(req, res, (err) => {
        if (err) {
            console.log("Error in file upload:", err);
            return res.status(500).json({ error: "Error uploading file" });
        }

        const { registration_no, brand, model, registration_date, fuel_type, type, last_service_date, amount: amountStr } = req.body;

        // Validate and parse amount
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount value" });
        }

        // Convert the uploaded file to buffer
        const photo = req.file ? req.file.buffer : null;

        const updateBikeQuery = photo
            ? `
                UPDATE bike
                SET 
                  brand = ?, model = ?, registration_date = ?, 
                  fuel_type = ?, type = ?, last_service_date = ?, photo = ?, amount = ?
                WHERE registration_no = ?
              `
            : `
                UPDATE bike
                SET 
                  brand = ?, model = ?, registration_date = ?, 
                  fuel_type = ?, type = ?, last_service_date = ?, amount = ?
                WHERE registration_no = ?
              `;

        const values = photo
            ? [
                  brand,
                  model,
                  registration_date,
                  fuel_type,
                  type,
                  last_service_date,
                  photo,
                  amount,
                  registration_no
              ]
            : [
                  brand,
                  model,
                  registration_date,
                  fuel_type,
                  type,
                  last_service_date,
                  amount,
                  registration_no
              ];

        db.query(updateBikeQuery, values, (err, result) => {
            if (err) {
                console.log("Error updating bike data:", err);
                return res.status(500).json({ error: "Error updating bike data" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Bike not found" });
            }
            res.status(200).json({ message: "Bike updated successfully" });
        });
    });
};


const UpdateCar = (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const uploadSingle = upload.single('photo'); // 'photo' matches the key in the multipart form data

    uploadSingle(req, res, (err) => {
        if (err) {
            console.log("Error in file upload:", err);
            return res.status(500).json({ error: "Error uploading file" });
        }

        const { registration_no, brand, model, registration_date, fuel_type, type, last_service_date, amount: amountStr } = req.body;

        // Validate and parse amount
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount value" });
        }

        // Convert the uploaded file to buffer
        const photo = req.file ? req.file.buffer : null;

        const updateCarQuery = photo
            ? `
                UPDATE car
                SET 
                    brand = ?, model = ?, registration_date = ?, 
                    fuel_type = ?, type = ?, last_service_date = ?, amount = ?, photo = ?
                WHERE registration_no = ?
              `
            : `
                UPDATE car
                SET 
                    brand = ?, model = ?, registration_date = ?, 
                    fuel_type = ?, type = ?, last_service_date = ?, amount = ?
                WHERE registration_no = ?
              `;

        const values = photo
            ? [
                  brand,
                  model,
                  registration_date,
                  fuel_type,
                  type,
                  last_service_date,
                  amount,
                  photo,
                  registration_no
              ]
            : [
                  brand,
                  model,
                  registration_date,
                  fuel_type,
                  type,
                  last_service_date,
                  amount,
                  registration_no
              ];

        // Debugging: Log query and values
        console.log("Query: ", updateCarQuery);
        console.log("Values: ", values);

        db.query(updateCarQuery, values, (err, result) => {
            if (err) {
                console.log("Error updating car data:", err);
                return res.status(500).json({ error: "Error updating car data" });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Car not found" });
            }
            res.status(200).json({ message: "Car updated successfully" });
        });
    });
};

module.exports = { UpdateBike, UpdateCar }
