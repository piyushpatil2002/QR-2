from flask import Flask, render_template, send_file, request
from datetime import datetime
import qrcode
import io
import os

app = Flask(__name__)

temp_dir = os.path.join(app.root_path, 'temp')
os.makedirs(temp_dir, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    # Extract data from the form
    item_code = request.form['item_code']
    item_quantity = request.form['item_quantity']
    grn_no = request.form['grn_no']
    grn_date = request.form['grn_date']
    material_type = request.form['material_type']
    dimension = request.form['dimension']

    # Generate QR code data
    date_of_arrival = datetime.now().strftime("%Y-%m-%d")
    serial_number = generate_serial_number()
    qr_data = f"Date: {date_of_arrival}, Serial Number: {serial_number}, Item Code: {item_code}, Item Quantity: {item_quantity}, GRN No.: {grn_no}, GRN Date: {grn_date}, Material Type: {material_type}, Dimension: {dimension}"

    # Generate QR code image
    qr_code_image = generate_qr_code(qr_data)

    # Save QR code image to temporary file
    temp_file_path = os.path.join(temp_dir, 'QR_Code.png')
    qr_code_image.save(temp_file_path, format='PNG')

    # Send QR code image as file download
    return send_file(temp_file_path, mimetype='image/png', as_attachment=True, download_name='QR_Code.png')

def generate_serial_number():
    import random
    return str(random.randint(1, 1000000))

def generate_qr_code(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    qr_code_image = qr.make_image(fill_color="black", back_color="white")
    return qr_code_image

if __name__ == '__main__':
    app.run(debug=True)
