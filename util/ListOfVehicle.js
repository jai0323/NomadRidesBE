const db = require('../config/dbConn');

const ListOfBike = async(vendor_id) =>{
    try {
            return await new Promise((resolve, reject) => {
            const query =vendor_id? 'SELECT * FROM bike where vendor_id = ?' : 'SELECT * FROM bike';  // Adjust the table name if needed

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
            return []; // Propagate the error to the calling function 
        }
  
}
const ListOfCar = async(vendor_id) =>{
    try {
        return await new Promise((resolve, reject) => {
        const query =vendor_id? 'SELECT * FROM car where vendor_id = ?' : 'SELECT * FROM car';  // Adjust the table name if needed

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
        return []; // Propagate the error to the calling function
    }

  
}


module.exports = {ListOfBike, ListOfCar}