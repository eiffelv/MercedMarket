const db = require("./db");

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

module.exports = {
    checkToken,
};