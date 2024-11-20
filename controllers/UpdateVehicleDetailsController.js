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

        const { registration_no, brand, model, registration_date, fuel_type, type, last_service_date } = req.body;

        // Convert the uploaded file to buffer
        const photo = req.file ? req.file.buffer : null;

        const bike = {
            registration_no,
            brand,
            model,
            registration_date,
            fuel_type,
            type,
            last_service_date,
            photo
        };

      

        const updateBikeQuery = photo?`
            UPDATE bike
            SET 
              brand = ?, model = ?, registration_date = ?, 
                fuel_type = ?, type = ?, last_service_date = ?, photo = ?
            WHERE registration_no = ?
        `:
        `
            UPDATE bike
            SET 
              brand = ?, model = ?, registration_date = ?, 
                fuel_type = ?, type = ?, last_service_date = ?
            WHERE registration_no = ?
        `
        ;

        const values =photo? [
            bike.brand,
            bike.model,
            bike.registration_date,
            bike.fuel_type,
            bike.type,
            bike.last_service_date,
            bike.photo,
            bike.registration_no
        ]:
        [
            bike.brand,
            bike.model,
            bike.registration_date,
            bike.fuel_type,
            bike.type,
            bike.last_service_date,
            bike.registration_no
        ]
        ;

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
    const { registration_no, brand, model, registration_date, fuel_type, type, last_service_date,  } = req.body;
    const photo = req.file ? req.file.buffer : null;
    const car = {
        registration_no,
        brand,
        model,
        registration_date,
        fuel_type,
        type,
        last_service_date,
        photo
    };

    

    const updateCarQuery =photo? `
        UPDATE car
        SET 
            brand = ?, model = ?, registration_date = ?, 
            fuel_type = ?, type = ?, last_service_date = ?, photo = ?
        WHERE registration_no = ?
    `:
    `
        UPDATE car
        SET 
            brand = ?, model = ?, registration_date = ?, 
            fuel_type = ?, type = ?, last_service_date = ?
        WHERE registration_no = ?
    `;

    const values =photo? [
        car.brand,
        car.model,
        car.registration_date,
        car.fuel_type,
        car.type,
        car.last_service_date,
        car.photo,
        car.registration_no
    ]:
    [
        car.brand,
        car.model,
        car.registration_date,
        car.fuel_type,
        car.type,
        car.last_service_date,
        car.registration_no
    ];

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
