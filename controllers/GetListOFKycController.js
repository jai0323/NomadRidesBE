const { ListOfKycCustomer, ListOfKycVendor } = require("../util/ListOfKyc");

const GetListOFKyc = async (req, res) =>{

    const customerPendingKyc = await ListOfKycCustomer();
    const VendorPendingKyc = await ListOfKycVendor();
    console.log("customerPendingKyc", customerPendingKyc);
    console.log("VendorPendingKyc", VendorPendingKyc);
    return res.status(200).json({
        message: 'KYC list',
        customerPendingKyc,
        VendorPendingKyc,
    });
}

module.exports = {GetListOFKyc};