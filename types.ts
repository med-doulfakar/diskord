import { Member, Server, User } from "@prisma/client";
import { Server as NetServer, Socket } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";


export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[];
};

export type NextApiResponseServerIO = NextApiRequest & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
