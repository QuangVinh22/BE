const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQR = async (url, order_id) => {
  try {
    console.log("Đang tạo mã QR...");
    const dirPath = path.join(__dirname, "../utils/qr/");
    const fileName = `qr_${order_id}.png`; // Đặt tên tệp theo order_id
    const filePath = path.join(dirPath, fileName);
    // Tạo thư mục nếu chưa tồn tại
    fs.mkdirSync(dirPath, { recursive: true });

    // Lưu mã QR vào tệp từ URL
    await QRCode.toFile(filePath, url, {
      color: {
        dark: "#000000", // Màu của các điểm QR
        light: "#FFFFFF", // Màu nền
      },
    });

    console.log("QR code đã được lưu!", filePath);
    return filePath; // Trả về đường dẫn tệp đã lưu
  } catch (err) {
    console.error("Lỗi khi tạo mã QR", err);
  }
};

module.exports = { generateQR };

// Sử dụng hàm generateQR với URL mà bạn muốn tạo mã QRx`
