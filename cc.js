const bcrypt = require("bcryptjs");
const crypto = require("crypto");
async function hashPassword() {
  const password = "123456"; // Mật khẩu cần mã hóa
  const saltRounds = 10; // Độ phức tạp của salt, giá trị phổ biến là 10

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

hashPassword();
