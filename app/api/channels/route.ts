import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MembershipRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, type } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!serverId)
      return new NextResponse("Missing server ID", { status: 400 });
    if (name == "general")
      return new NextResponse("Name cannot be 'general'", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: profile.id,
            role: {
              in: [MembershipRole.ADMIN, MembershipRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            name,
            type,
            userId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
