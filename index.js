const express = require("express");
const db = require("./db");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static HTML file


app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check in admins table first
        const [admins] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
        if (admins.length > 0) {
            const admin = admins[0];
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

            return res.json({
                success: true,
                message: "Login successful",
                user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, type: "admin" }
            });
        }

        // If not found in admins, check in users table
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        res.json({
            success: true,
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email, type: "user" }
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



// Fetch all users
app.get("/users", async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, name, email FROM users");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Register new user
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      // 1) Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 2) Insert and capture the new row’s ID
      const [result] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
  
      // 3) Return the ID along with your success message
      res.status(201).json({
        message: "User registered successfully",
        user: { id: result.insertId, name, email, type: "user" }
      });
    } catch (error) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

// Start server

// app.use((req, res) => {
//     res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

