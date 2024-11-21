
const db = require("../config/dbConn");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

function CustomerSignup (customer, res)  {
    try{
        let sql = "INSERT INTO `customer` SET ?";
        customer.id = uuid();
        customer.kyc_status = 'pending';
        db.query(sql, customer, (err, result)=>{
            if (err) {
                console.log("signup.js line:16");
                console.log(err);
                return res.status(500).json({ message: "Somethig went wrong" });
            }

            const user ={
                name:customer.name,
                email:customer.email,
                kyc_status:customer.kyc_status,
                id:customer.id,
                phone:customer.phone,
                type:'customer'

            }
            return res.status(200).json({ message: "signup successful", user });
        });
    }
    catch(error){

    }
}

module.exports = CustomerSignup;