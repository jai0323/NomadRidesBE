const handleRoot = async (req, res) => {
    res.json({ msg: "Hello World!" });
}

module.exports = { handleRoot };