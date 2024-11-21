
const db = require('../config/dbConn');
const { v4: uuid } = require("uuid");

const Booking = (req, res) => {

    const createTableQuerybooking = `
    CREATE TABLE IF NOT EXISTS booking (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        customer_id VARCHAR(36) NOT NULL,
        vendor_id VARCHAR(36) NOT NULL,
        vehicle_id VARCHAR(36) NOT NULL,
        from_date VARCHAR(36),
        to_date VARCHAR(36),
        insurance VARCHAR(20),
        transaction_id VARCHAR(36),
        vehicle_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    
    db.query(createTableQuerybooking, (err, result) => {
    if (err) {
        console.log("Booking line:40");
        console.log(err);
        return res.status(500).json({ message: "Database error" });
    }
    });
    
    const createTransactionTable = `
    CREATE TABLE IF NOT EXISTS transaction (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    insurance DECIMAL(10, 2),
    customer_id VARCHAR(36) NOT NULL,
    vendor_id VARCHAR(36) NOT NULL,
    status VARCHAR(20) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    db.query(createTransactionTable, (err, result) => {
    if (err) {
        console.log("Booking line:40");
        console.log(err);
        return res.status(500).json({ message: "Database error" });
    }
    });


    const { customer_id, vendor_id, vehicle_id, from_date, to_date, vehicle_type, payment_method, amount, insurance } = req.body;

    const transaction = {
        id: uuid(),
        payment_method,
        amount,
        insurance,
        customer_id,
        vendor_id,
        status: "successful",
    };

    const booking = {
        id: uuid(),
        customer_id,
        vendor_id,
        vehicle_id,
        from_date,
        to_date,
        insurance,
        transaction_id: transaction.id,
        vehicle_type,
    };

    // Start Transaction
    db.beginTransaction((err) => {
        if (err) {
            console.error("Transaction start error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        // Step 1: Check vehicle status
        db.query(
            `SELECT status FROM ${vehicle_type} WHERE registration_no = ?`,
            [vehicle_id],
            (err, results) => {
                if (err) {
                    console.error("Error checking vehicle status:", err);
                    return db.rollback(() => {
                        res.status(500).json({ message: "Database error" });
                    });
                }

                if (results.length === 0) {
                    return db.rollback(() => {
                        res.status(404).json({ message: "Vehicle not found" });
                    });
                }

                if (results[0].status === "unavailable") {
                    return db.rollback(() => {
                        res.status(400).json({ message: "Vehicle is unavailable" });
                    });
                }

                // Step 2: Insert into transaction table
                db.query(`INSERT INTO transaction SET ?`, transaction, (err) => {
                    if (err) {
                        console.error("Error inserting into transaction:", err);
                        return db.rollback(() => {
                            res.status(500).json({ message: "Transaction failed" });
                        });
                    }

                    // Step 3: Insert into booking table
                    db.query(`INSERT INTO booking SET ?`, booking, (err) => {
                        if (err) {
                            console.error("Error inserting into booking:", err);
                            return db.rollback(() => {
                                res.status(500).json({ message: "Transaction failed" });
                            });
                        }

                        // Step 4: Update vehicle status
                        db.query(
                            `UPDATE ${vehicle_type} SET status = 'unavailable' WHERE registration_no = ?`,
                            [vehicle_id],
                            (err) => {
                                if (err) {
                                    console.error("Error updating vehicle status:", err);
                                    return db.rollback(() => {
                                        res.status(500).json({ message: "Transaction failed" });
                                    });
                                }

                                // Step 5: Commit the transaction
                                db.commit((err) => {
                                    if (err) {
                                        console.error("Error committing transaction:", err);
                                        return db.rollback(() => {
                                            res.status(500).json({ message: "Transaction failed" });
                                        });
                                    }

                                    res.status(200).json({
                                        message: "Booking completed successfully",
                                        booking_id: booking.id,
                                    });
                                });
                            }
                        );
                    });
                });
            }
        );
    });
};

module.exports = { Booking };
