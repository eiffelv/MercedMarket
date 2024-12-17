const db = require("./db");

function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
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

module.exports = {
    checkToken,
    dbAll,
    dbGet,
    dbRun
};