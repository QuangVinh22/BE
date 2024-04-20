const QRCode = require("qrcode");

const generateQR = async (url) => {
  try {
    console.log("Generating QR code...");
    const qrImage = await QRCode.toDataURL(url);
    console.log(qrImage);

    // Lưu mã QR vào tệp sau khi sinh ra base64
    QRCode.toFile(
      "./qr.png",
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

// Thay 'http://localhost:8080/v1/product/get' bằng URL mà bạn muốn tạo mã QR
generateQR("http://localhost:8080/v1/product/get");
