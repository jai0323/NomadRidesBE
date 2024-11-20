const db = require('../config/dbConn');
const { ListOfBike, ListOfCar } = require('../util/ListOfVehicle');

const VendorDashbroadController = async (req, res) => {
    const {vendor_id} = req.body;

    const listofbike = await ListOfBike(vendor_id);
    const listofcar = await ListOfCar(vendor_id);
    // console.log("listofbike", listofbike);
    // console.log("listofcar", listofcar);
    return res.status(200).json({
        message: 'vehicle list',
        listofbike,
        listofcar,
    });
}
module.exports = VendorDashbroadController;