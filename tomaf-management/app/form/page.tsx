"use client";

import Image from "next/image";
import React, { useState } from "react";
import PersonalDetails from "./personalDetails";
import MemberFamily from "./memberFamily";
import MemberShip from "./membership";

import type {
  PersonalDetailsData,
  FamilyDetailsData,
  MembershipData,
} from "../ttypes";

type FormData = {
  personalDetails: PersonalDetailsData;
  familyDetails: FamilyDetailsData;
  membership: MembershipData;
};

const Page = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    personalDetails: {
      firstName: "",
      lastName: "",
      dob: null,
      gender: "",
      phone: "",
      address: "",
      nationalId: "",
      maritalStatus: "",
      occupation: "",
    },
    familyDetails: {
      noFamily: false,
      spouseName: "",
      spouseID: "",
      spouseContact: "",
      familySize: 0,
      childrenCount: 0,
      nextOfKin: "",
    },
    membership: {
      dateJoined: new Date(),
      isBaptized: true,
      baptismDate: null,
      departments: {},
    },
  });

  const steps = [
    <PersonalDetails
      key="personal"
      data={formData.personalDetails}
      setData={(data: PersonalDetailsData) =>
        setFormData((prev) => ({ ...prev, personalDetails: data }))
      }
    />,
    <MemberFamily
      key="family"
      data={formData.familyDetails}
      setData={(data: FamilyDetailsData) =>
        setFormData((prev) => ({ ...prev, familyDetails: data }))
      }
    />,
    <MemberShip
      key="membership"
      data={formData.membership}
      setData={(data: MembershipData) =>
        setFormData((prev) => ({ ...prev, membership: data }))
      }
    />,
  ];

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        console.log("Data submitted successfully");
        setSubmitted(true);
      } else {
        console.error("Submission failed:", result.error);
      }
    } catch (error) {
      console.error("Client error:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen px-4 text-black"
      style={{
        background: `linear-gradient(135deg, #EDEDF5, #FCFBF8, #FFF9F1, #CDD7EF, #E5E5F2)`,
      }}
    >
      <div className="flex flex-col items-center py-6 px-4 w-full max-w-5xl">
        <Image src="/afmlogo.png" alt="hero" width={80} height={80} />
        <h1 className="text-center text-base py-2 font-bold">
          Tomaf Assembly Registration Form
        </h1>
        <h3 className="text-gray-500 text-center text-sm">
          Enter Details to get started
        </h3>

        <div className="py-6 w-full flex justify-center items-center gap-x-4 gap-y-3">
          {["Personal Info", "Family Details", "Membership"].map(
            (label, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border text-[10px] md:text-xs font-semibold ${
                      currentStep === index
                        ? "border-purple-600 text-purple-600"
                        : "border-gray-600 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs md:text-sm ${
                      currentStep === index
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < 2 && (
                  <div className="hidden md:flex items-center w-64">
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                )}
              </React.Fragment>
            )
          )}
        </div>

        {submitted && (
          <div className="flex items-center gap-2 mt-4 bg-green-100 text-green-800 p-4 rounded-md shadow-sm">
            <Image src="/check.png" alt="Success" width={32} height={32} />
            <span>Details submitted successfully!</span>
          </div>
        )}

        {!submitted && steps[currentStep]}

        {!submitted && (
          <div className="pt-4 flex justify-between w-full max-w-5xl">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCurrentStep((prev) => Math.max(prev - 1, 0));
                }}
                className="w-full md:w-auto mx-2 bg-[#FFF9F1] text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleSubmit();
                } else {
                  // check if all required fields are filled
                  const currentStepData = steps[currentStep].props.data;
                  const isValid = Object.values(currentStepData).every(
                    (value) => value !== "" && value !== null
                  );

                  if (!isValid) {
                    alert("Please fill all required fields.");
                    return;
                  }
                  setCurrentStep((prev) =>
                    Math.min(prev + 1, steps.length - 1)
                  );
                }
              }}
              className="w-full md:w-auto mx-5 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
