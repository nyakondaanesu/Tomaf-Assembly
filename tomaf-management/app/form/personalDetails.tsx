"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PersonalDetailsData } from "../ttypes";

interface Props {
  data: PersonalDetailsData;
  setData: (data: PersonalDetailsData) => void;
}

const PersonalDetails = ({ data, setData }: Props) => {
  const { register, setValue, watch, handleSubmit } =
    useForm<PersonalDetailsData>({
      defaultValues: data,
    });

  const dob = watch("dob");

  useEffect(() => {
    const subscription = watch((values) => {
      setData(values as PersonalDetailsData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setData]);

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isDobFocused, setIsDobFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isAddressFocused, setIsAddressFocused] = useState(false);
  const [isOccupationFocused, setIsOccupationFocused] = useState(false);
  const [isNationalIdFocused, setIsNationalIdFocused] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);

  return (
    <form
      className="w-full max-w-5xl p-6 space-y-6"
      onSubmit={handleSubmit(() => {})}
    >
      {/* Name */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", {
              required: "First name is required",
            })}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => setIsNameFocused(false)}
            className={`border p-2 rounded-md ${
              isNameFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName", {
              required: "Last name is required",
            })}
            onFocus={() => setIsLastNameFocused(true)}
            onBlur={() => setIsLastNameFocused(false)}
            className={`border p-2 rounded-md ${
              isLastNameFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      {/* Gender & DOB */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="gender">Gender</label>
          <select
            {...register("gender", {
              required: "Gender is required",
            })}
            onFocus={() => setIsGenderFocused(true)}
            onBlur={() => setIsGenderFocused(false)}
            className={`border p-2 rounded-md ${
              isGenderFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
          >
            <option value="" className="text-gray-300">
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="dob">Date of Birth</label>
          <DatePicker
            onFocus={() => setIsDobFocused(true)}
            onBlur={() => setIsDobFocused(false)}
            selected={dob}
            onChange={(date) => setValue("dob", date)}
            className={`border p-2 rounded-md w-full ${
              isDobFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
            placeholderText="Select a date"
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>
      </div>

      {/* Phone & Marital Status */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="phone">Phone Number</label>
          <input
            {...register("phone", {
              required: "Phone number is required",
            })}
            onFocus={() => setIsPhoneFocused(true)}
            onBlur={() => setIsPhoneFocused(false)}
            placeholder="Enter Phone number "
            className={`border p-2 rounded-md ${
              isPhoneFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
            type="tel"
          />
        </div>

        <div className="flex flex-col w-full">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["married", "single", "widowed", "Divorced"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={status}
                  {...register("maritalStatus", {
                    required: "Marital status is required",
                  })}
                  className="h-4 w-4 text-purple-600 border-gray-300"
                />
                <span className="text-sm capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* National ID & Address */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="nationalId">National ID No</label>
          <input
            {...register("nationalId", {
              required: "National ID is required",
            })}
            onFocus={() => setIsNationalIdFocused(true)}
            onBlur={() => setIsNationalIdFocused(false)}
            placeholder="XX-1234567X12"
            className={`border p-2 rounded-md ${
              isNationalIdFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="address">Home Address</label>
          <input
            {...register("address", {
              required: "Address is required",
            })}
            onFocus={() => setIsAddressFocused(true)}
            onBlur={() => setIsAddressFocused(false)}
            placeholder="123 Main Street"
            className={`border p-2 rounded-md ${
              isAddressFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
          />
        </div>
      </div>

      {/* Occupation */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="occupation">Occupation</label>
          <input
            {...register("occupation", {
              required: "Occupation is required",
            })}
            onFocus={() => setIsOccupationFocused(true)}
            onBlur={() => setIsOccupationFocused(false)}
            placeholder="Enter your occupation e.g unemployed, Teacher, etc."
            className={`border p-2 rounded-md ${
              isOccupationFocused
                ? "border-blue-500 ring-4 ring-blue-200"
                : "border-gray-300"
            } `}
          />
        </div>
      </div>
    </form>
  );
};
export default PersonalDetails;
