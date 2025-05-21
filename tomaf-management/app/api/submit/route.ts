import { NextRequest, NextResponse } from "next/server";
import { SubmitData } from "@/app/db/quiries/insert";
import {
  PersonalDetailsData,
  MembershipData,
  FamilyDetailsData,
} from "@/app/ttypes";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const personalDetails = body.personalDetails as PersonalDetailsData;
    const membership = body.membership as MembershipData;
    const familyDetails = body.familyDetails as FamilyDetailsData;

    // Convert string dates back to Date objects
    const safePersonalDetails: PersonalDetailsData = {
      ...personalDetails,
      dob: personalDetails.dob ? new Date(personalDetails.dob) : null,
    };

    const safeMembership: MembershipData = {
      ...membership,
      dateJoined: new Date(membership.dateJoined),
      baptismDate: membership.baptismDate
        ? new Date(membership.baptismDate)
        : null,
    };

    await SubmitData(safePersonalDetails, safeMembership, familyDetails);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
