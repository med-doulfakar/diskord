import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const user = await initialProfile();
  const servers = await db.server.findFirst({
    where: { members: { some: { userId: user.id } } },
  });

  if(servers) {
    return <div> You already have a server </div>;
  }
  return <InitialModal />;
};

export default SetupPage;
