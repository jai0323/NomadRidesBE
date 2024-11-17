const db = require('../config/dbConn');
const { v4: uuid } = require("uuid");

const Booking = ({req, res}) => {
    const { customer_id, vendor_id, vehicle_id, from, to, insurance_status, transaction_id, vehicle_type, mode, amount, discount, insurance, platfrom_fee } = req.body;
//pls change the vehile status  
    const booking = {
        id:uuid(),
        customer_id, 
        vendor_id, 
        vehicle_id, 
        from, 
        to, 
        insurance_status, 
        transaction_id,
        vehicle_type
    }

    const transaction = {
        id:uuid(),
        mode,
        amount,
        discount,
        insurance,
        platfrom_fee,
        customer_id,
        vendor_id,
        status:"successful"
    }

        const createTransactionTable = `
        CREATE TABLE IF NOT EXISTS transaction (
            id VARCHAR(36) NOT NULL PRIMARY KEY,
            mode VARCHAR(50) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            discount DECIMAL(10, 2),
            insurance DECIMAL(10, 2),
            platform_fee DECIMAL(10, 2), -- Corrected 'platfrom_fee' to 'platform_fee'
            customer_id VARCHAR(36) NOT NULL,
            vendor_id VARCHAR(36) NOT NULL,
            status VARCHAR(20) DEFAULT 'successful',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
            FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE
        )`;

        db.query(createTransactionTable, (err, result) => {
            if (err) {
                console.log("Booking line:40");
                console.log(err);
                return res.status(500).json({ msg: "Database error" });
            }

            db.query(`INSERT INTO transaction SET ?`, transaction, (err, result)=>{
                if (err) {
                    console.log("Booking line:48");
                    console.log(err);
                    return res.status(500).json({ msg: "Database error" });
                }

                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS booking (
                        id VARCHAR(36) NOT NULL PRIMARY KEY,
                        customer_id VARCHAR(36) NOT NULL,
                        vendor_id VARCHAR(36) NOT NULL,
                        vehicle_id VARCHAR(36) NOT NULL,
                        from_date VARCHAR(36),
                        to-date VARCHAR(36),
                        insurance_status VARCHAR(20),
                        transaction_id VARCHAR(36),
                        vehicle_type VARCHAR(20),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
                        FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE CASCADE,
                        FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE,
                        FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE
                    )
                `;
            
                db.query(createTableQuery, (err, result) => {
                    if (err) {
                        console.log("Booking line:40");
                        console.log(err);
                        return res.status(500).json({ msg: "Database error" });
                    }
                       
                    db.query(`INSERT INTO booking SET ?`, booking, (err, result)=>{
                        if (err) {
                            console.log("Booking line:48");
                            console.log(err);
                            return res.status(500).json({ msg: "Database error" });
                        }
            
                        return res.status(200).json({ message:'booking done', booking_id:result[0].id });
                    })
                });
            });  
        });
} 


module.exports = { Booking }