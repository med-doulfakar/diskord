import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MembershipRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        inviteCode: uuidv4(),
        name,
        imageUrl,
        userId: profile.id,
        channels: {
          create: [{ name: "general", userId: profile.id, type: "TEXT" }],
        },
        members: {
          create: [{ userId: profile.id, role: MembershipRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
