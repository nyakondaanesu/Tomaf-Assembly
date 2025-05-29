"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FullMemberDetails } from "@/app/ttypes";

type MemberDetailsCardProps = {
  member: FullMemberDetails;
  onClose?: () => void;
};

export default function MemberDetailsCard({
  member,
  onClose,
}: MemberDetailsCardProps) {
  const { name, surname, personalDetails, spouseDetails, membership } = member;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-900 text-sm rounded-2xl shadow-2xl relative overflow-y-auto max-h-[90vh]">
        <CardHeader className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
          <CardTitle className="text-lg font-bold">
            {name} {surname}
          </CardTitle>
          {onClose && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6 p-4 text-gray-800 dark:text-gray-300">
          {personalDetails && (
            <section>
              <h3 className="font-semibold text-base mb-2 border-b pb-1 border-gray-300 dark:border-gray-700">
                🧍 Personal Details
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>Gender: {personalDetails.gender}</li>
                <li>DOB: {personalDetails.dob}</li>
                <li>Phone: {personalDetails.phone}</li>
                <li>Address: {personalDetails.address}</li>
                <li>National ID: {personalDetails.nationalId || "N/A"}</li>
                <li>Marital Status: {personalDetails.maritalStatus}</li>
                <li>Occupation: {personalDetails.occupation}</li>
              </ul>
            </section>
          )}

          {spouseDetails && (
            <section>
              <h3 className="font-semibold text-base mb-2 border-b pb-1 border-gray-300 dark:border-gray-700">
                👪 Family Details
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>Has Family: {spouseDetails.nofamily ? "Yes" : "No"}</li>
                {spouseDetails.nofamily && (
                  <>
                    <li>Spouse Name: {spouseDetails.spouseName || "N/A"}</li>
                    <li>Spouse ID: {spouseDetails.spouseId || "N/A"}</li>
                    <li>Family Size: {spouseDetails.familsize ?? "N/A"}</li>
                    <li>
                      Children Count: {spouseDetails.childrenCount ?? "N/A"}
                    </li>
                    <li>Next of Kin: {spouseDetails.nextOfKin || "N/A"}</li>
                    <li>
                      Spouse Contact: {spouseDetails.spouseContact || "N/A"}
                    </li>
                  </>
                )}
              </ul>
            </section>
          )}

          {membership && (
            <section>
              <h3 className="font-semibold text-base mb-2 border-b pb-1 border-gray-300 dark:border-gray-700">
                ⛪ Membership
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                <li>Date Joined: {membership.dateJoined}</li>
                <li>Baptized: {membership.isBaptized ? "Yes" : "No"}</li>
                {membership.isBaptized && (
                  <li>Baptism Date: {membership.baptismDate || "N/A"}</li>
                )}
              </ul>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
