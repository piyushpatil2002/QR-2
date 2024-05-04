const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate_qr', async (req, res) => {
    // Extract data from the form
    const { item_code, item_quantity, grn_no, grn_date, material_type, dimension } = req.body;

    // Generate QR code data
    const date_of_arrival = new Date().toISOString().slice(0, 10);
    const serial_number = generateSerialNumber();
    const qr_data = `Date: ${date_of_arrival}, Serial Number: ${serial_number}, Item Code: ${item_code}, Item Quantity: ${item_quantity}, GRN No.: ${grn_no}, GRN Date: ${grn_date}, Material Type: ${material_type}, Dimension: ${dimension}`;

    // Generate QR code image
    const qr_code_image = await generateQRCode(qr_data);

    // Save QR code image to temporary file
    const temp_file_path = path.join(__dirname, 'temp', 'QR_Code.png');
    qr_code_image.pipe(fs.createWriteStream(temp_file_path));

    // Send QR code image as file download
    res.download(temp_file_path, 'QR_Code.png');
});

// Generate serial number
function generateSerialNumber() {
    return uuidv4();
}

// Generate QR code
async function generateQRCode(data) {
    try {
        return await QRCode.toFileStream(data);
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

// Start server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
