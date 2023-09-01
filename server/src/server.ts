import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
// const origin = process.env.ORIGIN;
app.use(cors({ origin: true, credentials: true }));

app.use(express.json()); // JSON 형태의 요청 body를 파싱하기 위해 express.json() 미들웨어를 사용
app.use(morgan("dev")); // morgan 미들웨어 사용 -> dev 옵션 기준으로 GET / 500 7.409 ms - 50 은 각각 [HTTP메서드][주소][HTTP상태코드][응답속도] - [응답바이트]
app.use(cookieParser());

dotenv.config();

const port = 4000; // 백엔드 포트

// app.get("/", (_, res) => {
//   res.send("Running");
// });

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running at ${process.env.APP_URL}`);

  AppDataSource.initialize()
    .then(async () => {
      console.log("Database initialized!");
    })
    .catch((error) => console.log(error));
});
