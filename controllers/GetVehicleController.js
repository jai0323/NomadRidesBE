const db = require('../config/dbConn');

const GetVehicleController = async (req,res) => {
    const {registration_no, type} = req.body;
    console.log("-------" ,type,"-----", registration_no)
    db.query(`SELECT * from ${type} where registration_no = '${registration_no}'`, (err, result) => {
        if (err) {
            console.log("get vehicle line:8");
            console.log(err);
            return res.status(500).json({ msg: "Somethig went wrong" });
        }
        db.query(`SELECT * from vendor where id = '${result[0]?.vendor_id}'`, (err, vendor) => {
            if (err) {
                console.log("get vehicle line:8");
                console.log(err);
                return res.status(500).json({ msg: "Somethig went wrong" });
            }
            return res.status(200).json({status: 'fetched', vehicle: result[0], vendor:vendor[0]});
        });
    });
}

module.exports = GetVehicleController; 