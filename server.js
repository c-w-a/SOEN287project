
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path'); // using this to get the path, so it's dynamic for anyone using it

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error("rrror connecting to db:", err.message);
    } else {
        console.log("connected to SQLite database!");
    }
});

// specifying the path to the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

// ADMIN FEATURES:
// endpoint for admin login
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM Admin WHERE username = ? AND password = ?`;
    db.get(query, [username, password], (err, row) => {
        if (err) {
            res.status(500).send("database error..");
        } else if (row) {
            res.send("you have been authenticated!");
        } else {
            res.status(401).send("invalid username or password..");
        }
    });
});

// endpoint to get business info
app.get('/business-info', (req, res) => {
    const query = `SELECT * FROM Business WHERE id = 1`;
    db.get(query, (err, row) => { 
        if (err) {
            console.error("error fetching business info:", err.message);
            res.status(500).send("database error");
        } else if (!row) {
            res.status(404).send("no business info found..");
        } else {
            res.json(row);
        }
    });
});

// endpoint to update business info
app.put('/business-info', (req, res) => {
    const { businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress } = req.body;

    const query = `
        UPDATE Business
        SET name = ?, slogan = ?, email = ?, phone = ?, address = ?
        WHERE id = 1
    `;
    db.run(query, [businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress], function (err) {
        if (err) {
            console.error("error updating business info:", err.message);
            res.status(500).send("database error");
        } else {
            res.send("business info updated successfully");
        }
    });
});

// endpoint to delete business info
app.delete('/business-info', (req, res) => {
    const query = `
        UPDATE Business
        SET name = ' insert name..', slogan = ' insert slogan..', email = ' insert email..', phone = ' insert phone #..', address = ' insert address..'
        WHERE id = 1
    `;
    db.run(query, function (err) {
        if (err) {
            console.error("error deleting business info:", err.message);
            res.status(500).send("database error");
        } else {
            res.send("business info deleted successfully");
        }
    });
});

// endpoint to add a new service
app.post('/services', (req, res) => {
    const { name, description, duration, price } = req.body;

    if (!name || !price) {
        return res.status(400).send("service name and price required..");
    }

    const query = `
        INSERT INTO ServicesOffered (name, description, duration, price)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [name, description, duration, price], function (err) {
        if (err) {
            console.error("error adding service:", err.message);
            res.status(500).send("database error");
        } else {
            res.send({ success: true, id: this.lastID });
        }
    });
});

// CURRENTLY WORKING ON THESE ENDPOINTS FOR ADDING SERVICES - NOT TESTED YET
// // endpoint to update a service
// app.put('/services/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, description, duration, price } = req.body;

//     if (!name || !price) {
//         return res.status(400).send("name and price required..");
//     }

//     const query = `
//         UPDATE ServicesOffered
//         SET name = ?, description = ?, duration = ?, price = ?
//         WHERE id = ?
//     `;
//     db.run(query, [name, description, duration, price, id], function (err) {
//         if (err) {
//             console.error("error updating service:", err.message);
//             res.status(500).send("database error");
//         } else if (this.changes === 0) {
//             res.status(404).send("service not found.");
//         } else {
//             res.send("service updated successfully.");
//         }
//     });
// });

// // endpoint to delete a service
// app.delete('/services/:id', (req, res) => {
//     const { id } = req.params;

//     const query = `DELETE FROM ServicesOffered WHERE id = ?`;
//     db.run(query, [id], function (err) {
//         if (err) {
//             console.error("error deleting service:", err.message);
//             res.status(500).send("database error");
//         } else if (this.changes === 0) {
//             res.status(404).send("service not found.");
//         } else {
//             res.send("service deleted successfully.");
//         }
//     });
// });

// USER FEATURES:
// endpoint for user signup
app.post('/user-signup', (req, res) => {
    const { email, password, name, address, phone } = req.body;

    const query = `
        INSERT INTO Users (email, password, name, address, phone)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [email, password, name, address, phone], function (err) {
        if (err) {
            console.error("error during signup:", err.message);
            if (err.message.includes("UNIQUE constraint failed")) {
                res.status(400).send("Email already exists");
            } else {
                res.status(500).send("Database error");
            }
        } else {
            console.log("user signed up with ID:", this.lastID);
            res.send("signup successful! you can now log in..");
        }
    });
});

// endpoint for user login
app.post('/user-login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM Users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
        if (err) {
            console.error("database error:", err.message);
            res.status(500).send("database error");
        } else if (!user) {
            res.status(401).send("invalid email or password..");
        } else {
            if (user.password === password) {
                console.log("user logged in:", user.email);
                res.send("login successful!");
            } else {
                res.status(401).send("invalid email or password..");
            }
        }
    });
});

// start the server
const PORT = 5000;
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`);
});
