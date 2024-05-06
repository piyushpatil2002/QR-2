
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
        // const qrCodeText = JSON.stringify(formDataObject);
        const qrCodeText = formattedData;

        // Generate QR code
        const qrCodeContainer = document.getElementById("qr_code");
        qrCodeContainer.innerHTML = ""; // Clear any existing QR code
        const qrCode = new QRCode(qrCodeContainer, {
            text: qrCodeText,
            width: 500,
            height: 500,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Wait for the QR code image to load
        const qrCodeImage = qrCodeContainer.querySelector("img");
        qrCodeImage.onload = function() {
            // Download QR code image
            const downloadLink = document.createElement("a");
            downloadLink.href = qrCodeImage.src;
            downloadLink.download = "qrcode.jpg";
            downloadLink.click();
        };
    });
});
