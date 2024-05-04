document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form data
        var formData = {
            itemCode: document.getElementById('item_code').value,
            itemQuantity: document.getElementById('item_quantity').value,
            grnNo: document.getElementById('grn_no').value,
            grnDate: document.getElementById('grn_date').value,
            materialType: document.getElementById('material_type').value,
            dimension: document.getElementById('dimension').value
        };

        // Generate QR code
        var qrCodeContainer = document.getElementById('qr_code');
        qrCodeContainer.innerHTML = ''; // Clear previous QR code if exists
        var qr = new QRCode(qrCodeContainer, {
            text: JSON.stringify(formData),
            width: 128,
            height: 128
        });

        // Convert QR code to data URL
        var qrDataURL = qr.toDataURL();

        // Create download button
        var downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download QR Code';
        downloadButton.onclick = function() {
            // Create temporary link element
            var link = document.createElement('a');
            link.href = qrDataURL;
            link.download = 'qrcode.png';

            // Trigger click on link
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
        };

        // Append download button
        qrCodeContainer.appendChild(downloadButton);
    }

    // Add form submission event listener
    document.getElementById('materialForm').addEventListener('submit', handleSubmit);
});
