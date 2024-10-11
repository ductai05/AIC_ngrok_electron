1. Cài đặt ngrok https://ngrok.com/download
2. Truy cập https://dashboard.ngrok.com/signup để tạo một tài khoản mới.
3. Sau khi đăng ký, bạn sẽ cần xác minh địa chỉ email của mình.
4. Sau khi đã xác minh tài khoản, truy cập https://dashboard.ngrok.com/get-started/your-authtoken để lấy authtoken của bạn.
5. Mở terminal trên máy tính của bạn và chạy lệnh sau (thay YOUR_AUTHTOKEN bằng authtoken thật của bạn): ngrok config add-authtoken YOUR_AUTHTOKEN

npm install electron
npm install sortablejs

6. Chạy python local.py (bằng cmd)
7. Chạy ngrok http 5000 (bằng cmd)

8. Thêm lệnh trên notebook:

import requests
def LOCAL_SHOW():
    st = time.time()
    # KIS CSV
    data = {
        'video': [f"{item['L_index']}_{item['V_index']}" for item in ID_deep[:100]],
        'frame_idx': [item['frame_ids'] for item in ID_deep[:100]]
    }
    # test
    data = {
        'id': [f"C:\kf_data\{item['L_index']}\{item['V_index']}\\frame_{item['frame_ids']}.jpg" for item in ID_deep[:100]],
    }

    df = pd.DataFrame(data)
    csv_filename = f'query-p3-{num_task}-{type_task}.csv'
    df.to_csv(csv_filename ,index = False, header= False)
    print('done csv')
    
    def send_file_to_laptop(file_path, ngrok_url):
        url = f'{ngrok_url}/upload'
        with open(file_path, 'rb') as file:
            files = {'file': file}
            response = requests.post(url, files=files)
        return response.text
    # Sử dụng hàm
    ngrok_url = 'https://34e6-2405-4803-c601-73d0-3061-e562-3a14-58ff.ngrok-free.app'  # Thay thế bằng URL ngrok thực tế của bạn
    file_path = f'/kaggle/working/{csv_filename}'  # Thay thế bằng đường dẫn file bạn muốn gửi
    result = send_file_to_laptop(file_path, ngrok_url)
    print(result)

    en = time.time()
    print("Time:", en - st)

9. Thay ngrok_url trên notebook bằng link forwarding

10. Thay link keyframe dataset trong main.js    // Theo dõi thư mục

