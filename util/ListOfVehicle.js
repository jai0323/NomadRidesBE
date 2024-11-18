const db = require('../config/dbConn');

const ListOfBike = async(vendor_id) =>{
    try {
            return await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM bike where vendor_id = ?';  // Adjust the table name if needed

                db.query(query, vendor_id, (err, results) => {
                    if (err) {
                        console.error("Error fetching list of bike:", err);
                        reject(err); // Reject the promise with the error
                    } else {
                        resolve(results); // Resolve the promise with the results
                    }
                });
            });
        } catch (error) {
            console.error("ListOfBilke Error:", error);
            throw error; // Propagate the error to the calling function 
        }
  
}
const ListOfCar = async(vendor_id) =>{
    try {
        return await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM car where vendor_id = ?';  // Adjust the table name if needed

            db.query(query, vendor_id,(err, results) => {
                if (err) {
                    console.error("Error fetching list of car:", err);
                    reject(err); // Reject the promise with the error
                } else {
                    resolve(results); // Resolve the promise with the results
                }
            });
        });
    } catch (error) {
        console.error("ListOfCar Error:", error);
        throw error; // Propagate the error to the calling function
    }

  
}


module.exports = {ListOfBike, ListOfCar}