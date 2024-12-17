var express = require("express");
var router = express.Router();
const fs = require('fs');
const path = require("path");

// Route for "/img/:id"
router.get('/:id', (req, res) => {
    const id = req.params.id; // Extract the 'id' from the route
    const imgPath = path.join(__dirname, 'imgs', `${id}.png`);
    const defaultImgPath = path.join(__dirname, 'imgs', 'default.png');

    // Check if id.png exists
    fs.access(imgPath, fs.constants.F_OK, (err) => {
        if (!err) {
            // If file exists, send the image
            res.sendFile(imgPath);
        } else {
            // If file doesn't exist, send default.png
            res.sendFile(defaultImgPath);
        }
    });
});

module.exports = router;