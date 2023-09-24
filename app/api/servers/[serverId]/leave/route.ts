import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.serverId)
      return new NextResponse("Server ID missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        userId: { // check if the user is not the owner of the server
          not: profile.id,
        },
        members: { // actually a member of the server
          some: {
            userId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            userId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVERS PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
