const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path"); // Thêm dòng này để require 'path'
const generateQR = async (url) => {
  try {
    console.log("Generating QR code...");
    const qrImage = await QRCode.toDataURL(url);
    console.log(qrImage);

    //
    const dirPath = path.join(__dirname, "../utils/qr");
    const filePath = path.join(dirPath, "qr.png");

    console.log("Dẫn lồn: ", dirPath);
    console.log("Dẫn lồn: ", filePath);
    fs.mkdirSync(dirPath, { recursive: true });

    // Lưu mã QR vào tệp sau khi sinh ra base64
    QRCode.toFile(
      "../utils/qr/",
      filePath,
      url,
      {
        color: {
          dark: "#000000", // Màu của các điểm QR
          light: "#FFFFFF", // Màu nền
        },
      },
      function (error) {
        if (error) throw error;
        console.log("QR code đã được lưu!");
      }
    );
  } catch (err) {
    console.error("Error generating QR code", err);
  }
};
module.exports = { generateQR };
// Thay 'http://localhost:8080/v1/product/get' bằng URL mà bạn muốn tạo mã QR
