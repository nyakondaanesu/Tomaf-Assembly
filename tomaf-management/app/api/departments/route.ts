import { NextResponse } from "next/server";
import { getDepartmentsWithMembers } from "@/app/db/quiries/getDepartments";

export async function GET() {
  try {
    const departments = await getDepartmentsWithMembers();
    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error in departments API:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
