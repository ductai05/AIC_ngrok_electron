from flask import Flask, request
import os
import subprocess

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)

        # Mở cửa sổ CMD mới và chạy npm start
        try:
            subprocess.Popen(['start', 'cmd', '/K', 'npm', 'start'], shell=True)
            return f'File {file.filename} uploaded successfully and npm started', 200
        except Exception as e:
            return f'Error occurred while starting npm: {e}', 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)