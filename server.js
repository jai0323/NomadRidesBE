const express = require('express');
const cors = require('cors');
const db = require('./config/dbConn');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// Debug middleware


// Routes
app.use('/', require('./routes/root'));
app.use('/customerSignup', require('./routes/signup/customerSignup'));
app.use('/vendorSignup', require('./routes/signup/vendorSignup'));
app.use('/customerLogin', require('./routes/login/customerLogin'));
app.use('/vendorLogin', require('./routes/login/vendorLogin'));
app.use('/adminLogin', require('./routes/login/adminLogin'));
app.use('/KYC', require('./routes/KYC'));
app.use('/kyc_approval', require('./routes/admin/kycApproval'));
app.use('/kyc_list', require('./routes/admin/listofkyc'));  
app.use('/vehicle_list', require('./routes/vendorDashbroad'));  
app.use('/vehicle', require('./routes/registerVehicle'));
app.use('/vehicle', require('./routes/updateVehicle'));
app.use('/getVehicle', require('./routes/getVehicle'));
app.use('/booking', require('./routes/booking'));
app.use('/deleteVehicle', require('./routes/deleteVehicle'));
app.use('/bookings', require('./routes/getBookings'));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
 