const db = require('../config/dbConn');

const CustomerKYC = (req,res) => {
    const {aadhaar, license, id} = req.body;
    console.log(aadhaar,"-------" ,license,"-----", id)
    db.query(`UPDATE customer SET  aadhaar = '${aadhaar}', license = '${license}' where id = ? `, id , (err, result) => {
        if (err) {
            console.log("sCustomerKYC line:8");
            console.log(err);
            return res.status(500).json({ msg: "Somethig went wrong" });
        }
        return res.status(200).json({status: 'pending', message: "send for verification"});
    })
}


const VendorKYC = (req,res) => {
    const {aadhaar, license, id} = req.body;

    db.query(`UPDATE vendor SET  aadhaar = '${aadhaar}', pan = '${license}' where id = ? `, id , (err, result) => {
        if (err) {
            console.log("signup.js line:23");
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
        }
        return res.status(200).json({status: 'pending', message: "send for verification"});
    })
}

module.exports = {CustomerKYC, VendorKYC}