const db = require('../config/dbConn');

const KycApproval = (req, res) => {
    const { user_type, id, status } = req.body;
    console.log(status,"----",user_type,"---",id)
    if(status=='approved'){
        const sql = `UPDATE ${user_type} SET  kyc_status = 'approved' where id = ? `;
        db.query(sql, id , (err, result) => {
            if (err) {
                console.log("KYCApproval line:10");
                console.log(err);
                return res.status(500).json({ message: "Somethig went wrong" });
            }
    
            return res.status(200).json({status: 'approved', message: "KYC Completed"});
        })
    }
    else {
        const sql = `DELETE FROM ${user_type}  where id = ? `;
        db.query(sql, id , (err, result) => {
            if (err) {
                console.log("KYCApproval line:10");
                console.log(err);
                return res.status(500).json({ message: "Somethig went wrong" });
            }
    
            return res.status(200).json({status: 'Rejected', message: "User Removed"});
        })
    }

    

} 
module.exports = {KycApproval};