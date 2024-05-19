# IOT_Dashboard Project
Ứng dụng web này cho phép người dùng giám sát các cảm biến đo nhiệt độ, độ ẩm và độ sáng được kết nối với MQTT Broker. Người dùng có thể bật/tắt các thiết bị được kết nối và xem dữ liệu cảm biến hoặc trạng thái thiết bị được lưu trữ trong cơ sở dữ liệu.

  • Giám sát cảm biến: Theo dõi dữ liệu thời gian thực từ cảm biến nhiệt độ, độ ẩm và độ sáng.
  
  • Kiểm soát thiết bị: Kiểm soát các thiết bị được kết nối bằng cách bật hoặc tắt chúng.
  
  • Lưu trữ dữ liệu: Lưu dữ liệu cảm biến và trạng thái thiết bị vào cơ sở dữ liệu để tham khảo trong tương lai.
  
  • Giao diện người dùng: Giao diện trực quan để dễ dàng điều hướng và tương tác.
  
# Cài đặt
1. Clone the repository

       git clone https://github.com/quangthai123/LeQuangThaiPT191_IOTWeb.git
   
2. Setup Nodejs

    • Cài đặt nodejs: https://nodejs.org/en/download/current


4. Install Dependencies

    CLIENT

       cd LeQuangThaiPT191_IOTWeb/fe
       npm i

    SERVER

       cd LeQuangThaiPT191_IOTWeb/server
       npm i

5. Connect to MySQL Workbench

    • Chỉnh sửa các thông tin tới database của bạn: database name, host, username, password.

6. Run the app

    CLIENT
   
       cd LeQuangThaiPT191_IOTWeb/fe
       npm run dev

   SERVER

       cd LeQuangThaiPT191_IOTWeb/server
       npm run dev
