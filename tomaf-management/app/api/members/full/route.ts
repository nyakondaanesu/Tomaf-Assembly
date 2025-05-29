// /api/members/full/route.ts
import { getFullMemberDetails } from "@/app/db/quiries/memberDetails";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) return new Response("Missing ID", { status: 400 });

  const all = await getFullMemberDetails();
  const member = all.find((m) => m.id === id);

  return Response.json(member);
}
