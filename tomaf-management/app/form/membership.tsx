"use client";

import { MembershipData } from "../ttypes"; // Adjust path accordingly
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const departmentGroups: Record<string, string[]> = {
  "Praise & Worship": ["Praise and Worship", "Media"],
  Administration: ["Adminstration", "Hospitality and Decoration"],
  Service: ["Ushering", "Welfare", "Prayer and Intercession"],
  "Youth & Children": [
    "Youth",
    "Sunday School and Young Generation",
    "Boys",
    "Girls",
  ],
  Unions: ["Ladies Union", "Couples", "Men's fellowship"],
};

type MemberShipProps = {
  data: MembershipData;
  setData: (data: MembershipData) => void;
};

const MemberShip = ({ data, setData }: MemberShipProps) => {
  const handleDeptChange = (dept: string) => {
    const updated = { ...data.departments };
    if (dept in updated) delete updated[dept];
    else updated[dept] = "";
    setData({ ...data, departments: updated });
  };

  const handleRoleChange = (dept: string, role: string) => {
    setData({
      ...data,
      departments: { ...data.departments, [dept]: role },
    });
  };

  return (
    <form className="max-w-5xl w-full flex flex-col space-y-6 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Date Joined</label>
          <DatePicker
            selected={data.dateJoined}
            onChange={(date) => setData({ ...data, dateJoined: date })}
            className="border border-gray-300 p-2 rounded-md"
            placeholderText="Select a date"
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.isBaptized}
              onChange={() =>
                setData({ ...data, isBaptized: !data.isBaptized })
              }
            />
            <label className="text-sm text-gray-800 font-medium">
              Baptized
            </label>
          </div>
          {data.isBaptized && (
            <DatePicker
              selected={data.baptismDate}
              onChange={(date) => setData({ ...data, baptismDate: date })}
              className="border border-gray-300 p-2 rounded-md"
              placeholderText="Select baptism date"
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <label className="font-medium text-gray-700">
          Departments Involved
        </label>
        {Object.entries(departmentGroups).map(([group, depts]) => (
          <details
            key={group}
            className="border border-gray-300 rounded-md p-3"
            open
          >
            <summary className="font-semibold text-lg">{group}</summary>
            <div className="space-y-2 mt-2">
              {depts.map((dept) => (
                <div key={dept}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={dept in data.departments}
                      onChange={() => handleDeptChange(dept)}
                    />
                    <label>{dept}</label>
                  </div>
                  {dept in data.departments && (
                    <input
                      type="text"
                      placeholder={`Your role in ${dept} e.g. Leader, Member, secretary...`}
                      value={data.departments[dept]}
                      onChange={(e) => handleRoleChange(dept, e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </form>
  );
};

export default MemberShip;
