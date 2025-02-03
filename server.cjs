const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080; // Change if needed

// Serve static Vue files
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
