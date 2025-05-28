// app/api/admin/create-user/route.ts
import { createUserCredentials } from "@/app/db/quiries/createMember";

export async function POST(req: Request) {
  try {
    const { username, password, role } = await req.json();
    if (!username || !password || !role) {
      return new Response("Missing fields", { status: 400 });
    }

    const user = await createUserCredentials(username, password, role);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching age data:", err.message);
    } else {
      console.error("Unknown error fetching age data:", err);
    }
  }
}
