

document.addEventListener("DOMContentLoaded", function() {
    // Select the form and listen for its submission
    document.getElementById("materialForm").addEventListener("submit", function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        const formattedData = "Date: " + formDataObject["GRN Date"] +
                              ", Item Code: " + formDataObject["Item Code"] +
                              ", Item Quantity: " + formDataObject["Item Quantity"] +
                              ", GRN No.: " + formDataObject["GRN No"] +
                              ", GRN Date: " + formDataObject["GRN Date"] +
                              ", Material Type: " + formDataObject["Material Type"] +
                              ", Dimension: " + formDataObject["Dimension"];

        // Generate QR code text
        const qrCodeText = formattedData;

        // Generate QR code
        const qrCodeContainer = document.getElementById("qr_code");
        qrCodeContainer.innerHTML = ""; // Clear any existing QR code

        const qrCode = new QRCode(qrCodeContainer, {
            text: qrCodeText,
            width: 240,
            height: 240,
            colorDark: "#000000",
            colorLight: "#ffffff", // Set background color to white
            correctLevel: QRCode.CorrectLevel.H
        });

        // Wait for the QR code image to load
        const qrCodeImage = qrCodeContainer.querySelector("img");
        qrCodeImage.onload = function() {
            // Create a canvas element to add the border
            const canvas = document.createElement('canvas');
            canvas.width = qrCodeImage.width + 40; // Add 20 pixels of border on each side
            canvas.height = qrCodeImage.height + 40; // Add 20 pixels of border on each side
            const context = canvas.getContext('2d');

            // Draw white background
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR code image with border
            context.drawImage(qrCodeImage, 20, 20); // Start drawing QR code 20 pixels from the top-left corner

            // Convert canvas to data URL and download as image
            const downloadLink = document.createElement("a");
            downloadLink.href = canvas.toDataURL("image/png");
            downloadLink.download = "qrcode_with_border.png";
            downloadLink.click();
        };
    });
});

