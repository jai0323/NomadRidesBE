
const db = require("../config/dbConn");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

function VendorSignup (vendor, res)  {
    try{
        let sql = "INSERT INTO `vendor` SET ?";
        vendor.id = uuid();
        vendor.kyc_status = 'pending';
        db.query(sql, vendor, (err, result)=>{
            if (err) {
                console.log("signup.js line:16");
                console.log(err);
                return res.status(500).json({ message: "Somethig went wrong" });
            }

            const user ={
                name:vendor.name,
                email:vendor.email,
                kyc_status:vendor.kyc_status,
                id:vendor.id,
                 phone:customer.phone,
                type:'vendor'

            }
            return res.status(200).json({ message: "signup successful", user });
        });
    }
    catch(error){
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = VendorSignup;