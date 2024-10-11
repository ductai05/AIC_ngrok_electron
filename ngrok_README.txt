1. Cài đặt ngrok https://ngrok.com/download
2. Truy cập https://dashboard.ngrok.com/signup để tạo một tài khoản mới.
3. Sau khi đăng ký, bạn sẽ cần xác minh địa chỉ email của mình.
4. Sau khi đã xác minh tài khoản, truy cập https://dashboard.ngrok.com/get-started/your-authtoken để lấy authtoken của bạn.
5. Mở terminal trên máy tính của bạn và chạy lệnh sau (thay YOUR_AUTHTOKEN bằng authtoken thật của bạn): ngrok config add-authtoken YOUR_AUTHTOKEN
6. Tạo file local.py trên local: (nên để local.py và file ngrok cùng 1 folder)

from flask import Flask, request
import os

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
        return f'File {file.filename} uploaded successfully', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

7. Chạy python local.py (bằng cmd)
8. Chạy ngrok http 5000 (bằng cmd)
9. Thêm lệnh trên notebook:

from IPython.display import FileLink
st = time.time()
# KIS CSV
data = {
    'video': [f"{item['L_index']}_{item['V_index']}" for item in ID_deep[:100]],
    'frame_idx': [item['frame_ids'] for item in ID_deep[:100]]
}
df = pd.DataFrame(data)
csv_filename = f'query-p3-{num_task}-{type_task}.csv'
df.to_csv(csv_filename ,index = False, header= False)
print('done csv')

import requests
def send_file_to_laptop(file_path, ngrok_url):
    url = f'{ngrok_url}/upload'
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files)
    return response.text
# Sử dụng hàm
ngrok_url = 'https://efd0-2405-4803-c601-73d0-7cd6-b6a1-2d8d-e437.ngrok-free.app'  # Thay thế bằng URL ngrok thực tế của bạn
file_path = f'/kaggle/working/{csv_filename}'  # Thay thế bằng đường dẫn file bạn muốn gửi
result = send_file_to_laptop(file_path, ngrok_url)
print(result)

en = time.time()
print("Time:", en - st)

10. Thay ngrok_url trên notebook bằng link forwarding

