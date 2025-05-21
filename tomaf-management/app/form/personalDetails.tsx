"use client";

// adjust path as needed
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PersonalDetailsData } from "../ttypes";

interface Props {
  data: PersonalDetailsData;
  setData: (data: PersonalDetailsData) => void;
}

const PersonalDetails = ({ data, setData }: Props) => {
  return (
    <form className="w-full max-w-5xl p-6 space-y-6">
      {/* Name */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="John"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Doe"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
      {/* Gender & DOB */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="dob">Date of Birth</label>
          <DatePicker
            selected={data.dob}
            onChange={(date) => setData({ ...data, dob: date })}
            className="border border-gray-300 p-2 rounded-md"
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
            type="tel"
            id="phone"
            placeholder="+263..."
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col w-full">
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {["married", "single", "widowed"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="maritalStatus"
                  value={status}
                  checked={data.maritalStatus === status}
                  onChange={(e) =>
                    setData({ ...data, maritalStatus: e.target.value })
                  }
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
            type="text"
            id="nationalId"
            placeholder="XX-1234567X12"
            value={data.nationalId}
            onChange={(e) => setData({ ...data, nationalId: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="address">Home Address</label>
          <input
            type="text"
            id="address"
            placeholder="123 Main Street"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
      /* Occupation */
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            placeholder="XX-1234567X12"
            value={data.occupation}
            onChange={(e) => setData({ ...data, occupation: e.target.value })}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
    </form>
  );
};

export default PersonalDetails;
