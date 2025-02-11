const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Allow incoming data as url-encoded (form data)
app.use(express.urlencoded({ extended: true }));

let trapStatus = "Trap is empty";  // Default status

// // Endpoint to check trap status
// app.get('/getTrapStatus', (req, res) => {
//     res.json({ status: trapStatus });
// });

// // Endpoint to update trap status (used by Arduino)
// app.post('/updateTrap', (req, res) => {
//     const { status } = req.body;
//     if (status) {
//         trapStatus = status;
//         res.json({ message: "Trap status updated!" });
//     } else {
//         res.status(400).json({ error: "Missing status parameter" });
//     }
// });

// Endpoint to receive voice commands from MIT App Inventor


app.post('/voiceCommand', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.status(400).json({ error: "No command received" });
    }

    let responseMessage = "";
    
    if (command.includes("status")) {
        responseMessage = `The trap is currently: ${trapStatus}`;

    } else if (command.includes("Open")) {
        responseMessage = "Opening the trap door...";
        trapStatus = "Trap door opened";  // Update status

    } else {
        responseMessage = "Unknown command.";
    }

    res.send(responseMessage);
});

app.listen(PORT, () => {
    console.log(`Server running on http://192.168.1.11:${PORT}`);
});
