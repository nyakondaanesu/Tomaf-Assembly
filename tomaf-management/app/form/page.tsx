"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import PersonalDetails from "./personalDetails";
import { PersonalDetailsRef } from "./personalDetails";
import MemberFamily from "./memberFamily";
import MemberShip from "./membership";
import Link from "next/link";

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
  const [isloading, setIsLoading] = useState<boolean>(false);

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
      dateJoined: null,
      isBaptized: true,
      baptismDate: null,
      departments: {},
    },
  });

  const requiredFields: string[][] = [
    ["firstName", "lastName", "dob", "gender", "maritalStatus", "occupation"],
    ["noFamily"],
    ["dateJoined", "isBaptized"],
  ];
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const PersonalDetailsRef = useRef<PersonalDetailsRef>(null);

  const steps = [
    <PersonalDetails
      key="personal"
      ref={PersonalDetailsRef}
      data={formData.personalDetails}
      setData={(data: PersonalDetailsData) =>
        setFormData((prev) => ({ ...prev, personalDetails: data }))
      }
      errors={formErrors}
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

  const validateCurrentStep = async () => {
    const errors: { [key: string]: string } = {};
    const currentStepData = steps[currentStep].props.data;
    const fieldsToCheck = requiredFields[currentStep];

    if (currentStep === 0) {
      const isValid =
        (await PersonalDetailsRef.current?.validateForm()) || false;
      if (!isValid) return false;
    }

    for (const field of fieldsToCheck) {
      const value = currentStepData[field as keyof typeof currentStepData];

      if (
        (typeof value === "string" && value.trim() === "") ||
        value === null
      ) {
        errors[field] = "This field is required.";
      }

      if (currentStep === 1 && field === "noFamily" && !value) {
        if (!currentStepData.spouseName.trim())
          errors["spouseName"] = "Required.";
        if (!currentStepData.spouseID.trim()) errors["spouseID"] = "Required.";
      }

      if (
        currentStep === 2 &&
        field === "isBaptized" &&
        currentStepData.isBaptized
      ) {
        if (!currentStepData.baptismDate)
          errors["baptismDate"] = "Select baptism date.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
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

      //display a user-friendly error message
      alert(
        "An error occurred while submitting your details. Please try again."
      );
    } finally {
      setIsLoading(false);
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

        {isloading && (
          <div className="flex flex-col items-center justify-center h-64">
            <Image
              src="/loading.gif"
              alt="Loading"
              width={48}
              height={48}
              unoptimized
            />
            <span className="mt-2 text-yellow-800 text-sm">
              Submitting details...
            </span>
          </div>
        )}

        {!isloading && submitted && (
          <div className="flex items-center gap-4 mt-6 bg-green-50 text-green-900 p-5 rounded-lg shadow-md border border-green-200">
            <Image src="/check.png" alt="Success" width={40} height={40} />
            <span className="flex-1 font-semibold text-lg">
              Details submitted successfully!
            </span>
            <Link
              href="/Home"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Done
            </Link>
          </div>
        )}

        {!isloading && !submitted && (
          <>
            {steps[currentStep]}

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
                onClick={async () => {
                  if (currentStep === steps.length - 1) {
                    if (await validateCurrentStep()) {
                      handleSubmit();
                    }
                  } else {
                    if (await validateCurrentStep()) {
                      setCurrentStep((prev) =>
                        Math.min(prev + 1, steps.length - 1)
                      );
                    }
                  }
                }}
                disabled={isloading}
                className={`w-full md:w-auto mx-5 px-4 py-2 rounded-md transition ${
                  isloading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isloading
                  ? "Submitting..."
                  : currentStep === steps.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="w-full text-center py-4 text-xs text-gray-500 mt-auto">
        Developed by Anesu Nyakonda
      </footer>
    </div>
  );
};

export default Page;
