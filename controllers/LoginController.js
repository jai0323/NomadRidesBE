const db = require('../config/dbConn');
const { ListOfKycCustomer, ListOfKycVendor } = require('../util/ListOfKyc');

const CustomerLogin = (req,res) =>{

    const {email, password} = req.body;
    console.log(email,password);
    db.query('SELECT * FROM customer WHERE  email= ?',  email, async (err, results) => {

        if (err) {
            console.log("GetOTPController.js line:29");
            console.log(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (results.length == 0 ) {
            res.status(201).json({ error:'not found',message: "Account doesn't exist. Please Signup" });
            return;
        }

        if (results.length > 0 && results[0].password == password) {
            const user ={
                name:results[0].name,
                email:results[0].email,
                kyc_status:results[0].kyc_status,
                id:results[0].id,
                 phone:results[0].phone,
                type:'customer'

            }
            res.status(200).json({ message: 'signin successful', user});
            return;
        }
        else{
            return res.status(200).json({ message: 'invalid password' });
        }

    });


} 


const VendorLogin = (req,res) =>{
    const {email, password} = req.body;

    db.query('SELECT * FROM vendor WHERE  email= ?',  email, async (err, results) => {

        if (err) {
            console.log("GetOTPController.js line:29");
            console.log(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (results.length == 0 ) {
            res.status(400).json({ error:'not found',message: "Account doesn't exist. Please Signup" });
            return;
        }
        if (results.length > 0 && results[0].password == password) {
            const user ={
                name:results[0].name,
                email:results[0].email,
                kyc_status:results[0].kyc_status,
                id:results[0].id,
                phone:results[0].phone,
                type:'vendor'

            }
            res.status(200).json({ message: 'signin successful', user });
            return;
        }
        else{
            return res.status(200).json({ message: 'invalid password' });
        }

    });

} 


const AdminLogin = (req,res) =>{
    const {email, password} = req.body;

   
    db.query('SELECT * FROM admin WHERE  email= ?',  email, async (err, results) => {

        if (err) {
            console.log("GetOTPController.js line:29");
            console.log(err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (results.length == 0 ) {
            res.status(400).json({ error:'not found',message: "Account doesn't exist. Please Signup" });
            return;
        }
        if (results.length > 0 && results[0].password == password) {
            const user ={
                name:results[0].name,
                email:results[0].email

            }

           
                return res.status(200).json({
                    message: 'signin successful',
                    user
                });
            
        }
        else{
            return res.status(200).json({ message: 'invalid password' });
        }

    });

   

} 

module.exports = {CustomerLogin, VendorLogin, AdminLogin}