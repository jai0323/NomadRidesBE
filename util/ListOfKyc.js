const db = require("../config/dbConn");

const ListOfKycCustomer = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.query('SELECT * FROM customer WHERE kyc_status = ?', 'pending', (err, results) => {
                if (err) {
                    console.error("Error fetching customer KYC:", err);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(results); // Resolve the promise with the results
                }
            });
        });
    } catch (error) {
        console.error("ListOfKycCustomer Error:", error);
        throw error; // Propagate the error to the calling function
    }
};

const ListOfKycVendor = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.query('SELECT * FROM vendor WHERE kyc_status = ?', 'pending', (err, results) => {
                if (err) {
                    console.error("Error fetching vendor KYC:", err);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(results); // Resolve the promise with the results
                }
            });
        });
    } catch (error) {
        console.error("ListOfKycVendor Error:", error);
        throw error; // Propagate the error to the calling function
    }
};

module.exports = { ListOfKycVendor, ListOfKycCustomer };
