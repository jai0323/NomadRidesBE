const db = require('../config/dbConn');

const DeleteVehicle = async (req, res) => {
    const { id, type } = req.body;

    // Validate input
    if (!id || !type) {
        return res.status(400).json({ msg: "Invalid request. 'id' and 'type' are required." });
    }

    try {
        // Use parameterized queries to prevent SQL injection
        const query = `DELETE FROM ?? WHERE registration_no = ?`;
        db.query(query, [type, id], (err, result) => {
            if (err) {
                console.error("Error in DeleteVehicle:", err);
                return res.status(500).json({ msg: "Something went wrong" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ msg: "No vehicle found with the given id" });
            }

            return res.status(200).json({ status: 'deleted' });
        });
    } catch (error) {
        console.error("Unexpected error in DeleteVehicle:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { DeleteVehicle };
