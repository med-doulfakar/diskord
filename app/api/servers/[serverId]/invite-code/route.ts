import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.serverId)
      return new NextResponse("Server ID missing", { status: 400 });

    const server = await db.server.update({
      where: { id: params.serverId, userId: profile.id },
      data: { inviteCode: uuidv4() },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.error("[SERVERID PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
