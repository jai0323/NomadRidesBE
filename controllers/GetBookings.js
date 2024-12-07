const db = require('../config/dbConn');

const GetBookings = async (req,res) => {
    const {id} = req.body;
    console.log("-------" ,"-----", id)
    db.query(`SELECT * from booking where customer_id = '${id}'`, (err, result) => {
        if (err) {
            console.log("get vehicle line:8");
            console.log(err);
            return res.status(500).json({ msg: "Somethig went wrong" });
        }
       
        return res.status(200).json({status: 'fetched', bookings: result});
    });
}

module.exports = GetBookings;  