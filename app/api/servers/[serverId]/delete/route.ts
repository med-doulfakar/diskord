import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MembershipRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.serverId)
      return new NextResponse("Server ID missing", { status: 400 });

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        userId: profile.id,
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
