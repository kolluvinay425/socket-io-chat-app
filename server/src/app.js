import express from "express";
import cors from "cors";
import si from "systeminformation";

// promises style - new since version 3
// si.system()
//   .then((data) => console.log("system details", data))
//   .catch((error) => console.error(error));
import QRCode from "qrcode";
// export const generateQR = async (text) => {
//   try {
//     const qr = await QRCode.toDataURL(text);
//     console.log(qr);
//   } catch (err) {
//     console.error(err);
//   }
// };
// generateQR("vinay");
// let segs = [
//   { data: "ABCDEFG", mode: "alphanumeric" },
//   { data: "0123456", mode: "numeric" },
// ];
// QRCode.toDataURL(segs, { version: 2 }, function (err, url) {
//   console.log("dacbdjkb", url);
// });
export const app = express();
// const port = 3030;
app.use(cors());
app.use(express.json());

// app.get("/chat/:room", async (req, res) => {});

export default app;
