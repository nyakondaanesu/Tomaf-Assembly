"use client";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PersonalDetailsData } from "../ttypes";

interface Props {
  data: PersonalDetailsData;
  setData: (data: PersonalDetailsData) => void;
  errors?: Record<string, string>;
}

export interface PersonalDetailsRef {
  validateForm: () => Promise<boolean>;
  getFormData: () => PersonalDetailsData;
}

const PersonalDetails = forwardRef<PersonalDetailsRef, Props>(
  ({ data, setData }, ref) => {
    const {
      register,
      watch,
      handleSubmit,
      control,
      trigger,
      getValues,
      formState: { errors },
    } = useForm<PersonalDetailsData>({
      defaultValues: data,
      mode: "onBlur",
    });

    // Expose validation methods to parent
    useImperativeHandle(ref, () => ({
      validateForm: async () => {
        const isValid = await trigger();
        return isValid;
      },
      getFormData: () => getValues(),
    }));

    useEffect(() => {
      const subscription = watch((values) => {
        setData(values as PersonalDetailsData);
      });
      return () => subscription.unsubscribe();
    }, [watch, setData]);

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
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
                  : errors.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </span>
            )}
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
                  : errors.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </span>
            )}
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
                  : errors.gender
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="dob">Date of Birth</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                name="dob"
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          size: "small",
                          error: !!errors.dob,
                        },
                      }}
                    />
                    {errors.dob && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.dob.message}
                      </span>
                    )}
                  </>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        {/* Phone & Marital Status */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(\+?\d{1,4}[-.\s]?)?(\d{9,15})$/,
                  message: "Enter a valid phone number (e.g 0771234567)",
                },
              })}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
              placeholder="Enter phone number"
              className={`border p-2 rounded-md ${
                isPhoneFocused
                  ? "border-blue-500 ring-4 ring-blue-200"
                  : errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
              type="tel"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </span>
            )}
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
            {errors.maritalStatus && (
              <span className="text-red-500 text-sm mt-1">
                {errors.maritalStatus.message}
              </span>
            )}
          </div>
        </div>

        {/* National ID & Address */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="nationalId">National ID No</label>
            <input
              {...register("nationalId", {
                required: "National ID is required",
                pattern: {
                  value: /^\d{2}[0-9A-Za-z]{10}$/,
                  message: "Enter a valid National ID (e.g., 12XXXXXXXV12)",
                },
              })}
              onFocus={() => setIsNationalIdFocused(true)}
              onBlur={() => setIsNationalIdFocused(false)}
              placeholder="e.g 12XXXXXXXV12"
              className={`border p-2 rounded-md ${
                isNationalIdFocused
                  ? "border-blue-500 ring-4 ring-blue-200"
                  : errors.nationalId
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
            />
            {errors.nationalId && (
              <span className="text-red-500 text-sm mt-1">
                {errors.nationalId.message}
              </span>
            )}
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
                  : errors.address
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
            />
            {errors.address && (
              <span className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </span>
            )}
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
                  : errors.occupation
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
            />
            {errors.occupation && (
              <span className="text-red-500 text-sm mt-1">
                {errors.occupation.message}
              </span>
            )}
          </div>
        </div>
      </form>
    );
  }
);

PersonalDetails.displayName = "PersonalDetails";

export default PersonalDetails;
