const express = require("express");
const router = express.Router();
const db = require("./db");

function generateToken(length = 16, charsAllowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789") {
    let token = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsAllowed.length);
        token += charsAllowed[randomIndex];
    }
    return token;
}

async function checkToken(uid, token) {
    if (!uid || !token) {
        return false;
    }

    try {
        // Wrap the callback-based db.get in a Promise
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM Users WHERE id = ?", [uid], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (!user) {
            return false;
        }

        if (user.token === token) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


/* GET /user/ */
// Test route to ensure that the user router is working
router.get("/", function (req, res, next) {
    res.send("/user OK");
});

/* POST /user/login */
router.get("/login", async function (req, res, next) {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    db.get(
        "SELECT * FROM Users WHERE email = ?",
        [email],
        async (err, user) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!user) return res.status(401).json({ error: "User not found" });


            const token = generateToken();
            const updateSql = `UPDATE Users SET token = ? WHERE email = ?`;

            // Execute the UPDATE statement
            db.run(updateSql, [token, email], async function (err) {
                if (err) {
                    console.error('Error updating token:', err.message);
                    if (callback) callback(err);
                    return;
                }

                if (this.changes === 0) {
                    console.log(`No user found with email: ${email}`);
                    if (callback) callback(null, false);
                    return;
                }

                console.log(`Token updated successfully for email: ${email}`);
                console.log(`New Token: ${token}`);
                return res.status(200).json({ token: token, uid: user.id });
            });
        }
    );
});

/* POST /user/register */
router.get("/register", function (req, res, next) {
    const { name, email, password } = req.query;
    console.log(name, email, password)

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const token = generateToken()

        // Insert user
        db.run(
            "INSERT INTO Users (name, email, password, token) VALUES (?, ?, ?, ?)",
            [name, email, password, token],
            function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed")) {
                        return res.status(409).json({ error: "Email already exists" });
                    }
                    console.log(err);
                    return res.status(500).json({ error: "Error creating user" });
                }
                res.status(201).json({ message: "User created successfully" });
            }
        );
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/* POST /user/logout */
router.post("/logout", function (req, res, next) {
    try {
        // Clear the JWT token cookie
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed" });
    }
});

/* PUT /user/updateSettings */
router.put("/updateSettings", function (req, res, next) {
    // update settings logic here
});

/* GET /user/getSettings */
router.get("/getSettings", function (req, res, next) {
    // get settings logic here
});

/* GET /user/getProfile */
router.get("/getProfile", function (req, res, next) {
    // get profile logic here
});

/* PUT /user/setProfile */
router.put("/setProfile", function (req, res, next) {
    // set profile logic here
});

/* POST /user/setupPayment */
router.post("/setupPayment", function (req, res, next) {
    const { address, city, state, zip, phone, sfsu_id } = req.body;
    // Get user ID from JWT token
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        db.run(
            `UPDATE Users 
       SET address = ?, city = ?, state = ?, zip = ?, phone = ?, sfsu_id = ?
       WHERE id = ?`,
            [address, city, state, zip, phone, sfsu_id, userId],
            function (err) {
                if (err) return res.status(500).json({ error: "Update failed" });
                res.json({ message: "Payment info updated successfully" });
            }
        );
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
});

/* GET /user/getPayment */
router.get("/getPayment", function (req, res, next) {
    // get payment logic here
});

/* DELETE /user/destroyAccount */
router.delete("/destroyAccount", function (req, res, next) {
    // destroy account logic here
});

/* PUT /user/updatePassword */
router.put("/updatePassword", function (req, res, next) {
    // update password logic here
});

/* POST /user/resetPassword */
router.post("/resetPassword", function (req, res, next) {
    // reset password logic here
});

module.exports = router;