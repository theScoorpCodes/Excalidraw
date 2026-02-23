import 'dotenv/config'
import jwt, { JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: number[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, "secret");
  
    if (typeof decoded === "string") {
      return null;
    }
  
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (e: any) {
    return null;
  }
}

wss.on("connection", (ws, request) => {
  console.log("connected in websocket server");
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(data.roomId);

    }

    if (data.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);

      if (!user) return;
      user.rooms = user.rooms.filter((x) => x !== data.roomId);
    }

    if (data.type === "chat") {
      const roomId = Number(data.roomId);
      const message = data.message;

     try {
         await prisma.chat.create({
           data: {
             message,
             roomId,
             userId,
           },
         });
     } catch (err: any) {
        console.error(err);
     }

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({ type: "chat", message, roomId }));
        }
      });
    }
  });
});
