import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user.routes";
import { prisma } from "@repo/db/client";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello from http-backend!");
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  const messages = await prisma.chat.findMany({
    where: {
      roomId,
    },
    orderBy: {
      id: "desc",
    },
    take: 10,
  })

  res.json(messages);
});
app.get("/room/:slug", async (req, res) => {
  const slug = (req.params.slug);
  const room = await prisma.room.findMany({
    where: {
     slug
    },
  })

  res.json({
    room
  });
});




app.listen(3001, () => {
  console.log("http-backend listening on port 3001");
});
