
const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const path = require('path'); // using this to get the path, so it's dynamic for anyone using it

const app = express();

// configure session
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  }));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error("Error connecting to db:", err.message);
    } else {
        console.log("Connected to SQLite database!");
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
            res.status(500).send("Database error..");
        } else if (row) {
            res.send("You have been authenticated!");
        } else {
            res.status(401).send("Invalid username or password..");
        }
    });
});

// endpoint to get business info
app.get('/business-info', (req, res) => {
    const query = `SELECT * FROM Business WHERE id = 1`;
    db.get(query, (err, row) => { 
        if (err) {
            console.error("Error fetching business info:", err.message);
            res.status(500).send("Database error");
        } else if (!row) {
            res.status(404).send("No business info found..");
        } else {
            res.json(row);
        }
    });
});

// // endpoint to update business info
// app.put('/business-info', (req, res) => {
//     const { businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress } = req.body;

//     const query = `
//         UPDATE Business
//         SET name = ?, slogan = ?, email = ?, phone = ?, address = ?
//         WHERE id = 1
//     `;
//     db.run(query, [businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress], function (err) {
//         if (err) {
//             console.error("error updating business info:", err.message);
//             res.status(500).send("database error");
//         } else {
//             res.send("business info updated successfully");
//         }
//     });
// });

//for updating business info
app.post('/business-info', (req, res) => {
    const { businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress } = req.body;

    const query = `
        UPDATE Business
        SET name = ?, slogan = ?, email = ?, phone = ?, address = ?
        WHERE id = 1
    `;
    db.run(query, [businessName, businessSlogan, emailAddress, phoneNumber, physicalAddress], function (err) {
        if (err) {
            console.error("Error updating business info:", err.message);
            res.status(500).send("Database error");
        } else {
            res.send("Business info updated successfully!");
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
            console.error("Error deleting business info:", err.message);
            res.status(500).send("Database error");
        } else {
            res.send("Business info deleted successfully.");
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
            console.error("Error adding service:", err.message);
            res.status(500).send("Database error");
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
            console.error("Error during signup:", err.message);
            if (err.message.includes("UNIQUE constraint failed")) {
                res.status(400).send("Email already exists");
            } else {
                res.status(500).send("Database error");
            }
        } else {
            console.log("User signed up with ID:", this.lastID);
            res.send("Signup successful! you can now log in..");
        }
    });
});

// endpoint for user login
app.post('/user-login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM Users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
        if (err) {
            console.error("Database error:", err.message);
            res.status(500).send("database error");
        } else if (!user) {
            res.status(401).send("Invalid email or password..");
        } else {
            if (user.password === password) {
                req.session.userId = user.id;
                req.session.email = user.email;
                
                console.log("user logged in:", user.email);
                res.send("Login successful!");
            } else {
                res.status(401).send("Invalid email or password..");
            }
        }
    });
});

// endpoint to get user info
app.get('/user-info', (req, res) => {
    const userId = req.session.userId;
    const query = `SELECT * FROM Users WHERE id = ?`;
    db.get(query, [userId], (err, row) => { 
        if (err) {
            console.error("error fetching user info:", err.message);
            res.status(500).send("database error");
        } else if (!row) {
            res.status(404).send("no user info found..");
        } else {
            res.json(row);
        }
    });
});


// endpoint to edit user info
app.put('/user-info', (req, res) => {
    const { name, email, address, phone } = req.body;
    const userId = req.session.userId;

    const query = `
        UPDATE Users
        SET name = ?, email = ?, address = ?, phone = ?
        WHERE id = ?
    `;
    db.run(query, [name, email, address, phone, userId], function (err) {
        if (err) {
            console.error("error updating info:", err.message);
            res.status(500).send("database error");
        } else {
            res.send("user info updated successfully");
        }
    });
});

// endpoint to delete a user
app.delete('/user-info', (req, res) => {
    const userID = req.session.userId;
    const query = `DELETE FROM Users WHERE id = ?`;

    db.run(query, [userID], function (err) {
        if (err) {
            console.error('error deleting account:', err.message);
            res.status(500).send('error deleting account');
        } else {
            req.session.destroy(err => {
                if (err) {
                    console.error('error deleting account:', err);
                    res.status(500).send('error deleting account');
                } else {
                    res.send('account deleted successfully');
                }
            });
        }
    });
    });

// endpoint to log out user
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("error logging out:", err);
            res.status(500).send("error logging out");
        } else {
            res.send("logged out successfully");
        }
    });
});

// start the server
const PORT = 5000;
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`);
});
