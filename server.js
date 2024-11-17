require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const db = require('./config/dbConn');
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/', require('./routes/root'));
app.use('/customerSignup', require('./routes/signup/customerSignup'));
app.use('/vendorSignup', require('./routes/signup/vendorSignup'));
app.use('/customerLogin', require('./routes/login/customerLogin'));
app.use('/vendorLogin', require('./routes/login/vendorLogin'));
app.use('/adminLogin', require('./routes/login/adminLogin'));


app.use('/KYC', require('./routes/KYC'));
app.use('/kyc_approval', require('./routes/admin/kycApproval'));
app.use('/kyc_list', require('./routes/admin/listofkyc'));
app.use('/vehicle', require('./routes/registerVehicle'));



app.listen(PORT, () => console.log(`Server is running at ${PORT}`));