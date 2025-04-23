
from flask import Flask, render_template, request, jsonify
import qrcode
import base64
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    data = request.json
    image_url = data.get('url')
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(image_url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    return jsonify({"qr_code": img_str})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
