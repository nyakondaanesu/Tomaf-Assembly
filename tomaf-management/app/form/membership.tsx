"use client";

import { MembershipData } from "../ttypes"; // Adjust this import as needed
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Department } from "../ttypes"; // Adjust this import as needed
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
// Updated: Includes department IDs from your DB
const departmentGroups: Record<string, Department[]> = {
  "Praise & Worship": [
    { id: 1, name: "Praise and Worship" },
    { id: 2, name: "Media" },
  ],
  Administration: [
    { id: 3, name: "Administration" },
    { id: 4, name: "Hospitality and Decoration" },
  ],
  Service: [
    { id: 5, name: "Ushering and Protocols" },
    { id: 6, name: "Prayer and Intercession" },
    { id: 8, name: "Evangelism" },
    { id: 12, name: "welfare" },
  ],
  "Youth & Children": [
    { id: 7, name: "Sunday School and Young Generation" },
    { id: 13, name: "Boys" },
    { id: 14, name: "Girls" },
    { id: 15, name: "Youth" },
  ],
  Unions: [
    { id: 10, name: "ladies union" },
    { id: 9, name: "Couples union" },
    { id: 11, name: "men's fellowship" },
  ],
};

type MemberShipProps = {
  data: MembershipData;
  setData: (data: MembershipData) => void;
};

const MemberShip = ({ data, setData }: MemberShipProps) => {
  const handleDeptChange = (id: number, name: string) => {
    const updated = { ...data.departments };
    if (id in updated) {
      delete updated[id];
    } else {
      updated[id] = { name, role: "" };
    }
    setData({ ...data, departments: updated });
  };

  const handleRoleChange = (id: number, role: string) => {
    if (!(id in data.departments)) return;
    setData({
      ...data,
      departments: {
        ...data.departments,
        [id]: { ...data.departments[id], role },
      },
    });
  };

  const { control, watch } = useForm<MembershipData>({
    defaultValues: data,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      setData(values as MembershipData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setData]);

  return (
    <form className="max-w-5xl w-full flex flex-col space-y-6 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Enter Date Joined</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dateJoined"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      size: "small",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className="flex flex-col mt-1">
          <div className="flex items-center space-x-2">
            <input
              className="h-4 w-4"
              type="checkbox"
              checked={data.isBaptized}
              onChange={() =>
                setData({ ...data, isBaptized: !data.isBaptized })
              }
            />
            <label className="text-sm text-gray-800 font-medium">
              Baptized (check if baptized)
            </label>
          </div>
          {data.isBaptized && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="baptismDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined",
                        size: "small",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
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
              {depts.map(({ id, name }) => (
                <div key={id}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={id in data.departments}
                      onChange={() => handleDeptChange(id, name)}
                    />
                    <label>{name}</label>
                  </div>
                  {id in data.departments && (
                    <input
                      type="text"
                      placeholder={`Enter your role in ${name} e.g. Leader, Member, secretary...`}
                      value={data.departments[id].role}
                      onChange={(e) => handleRoleChange(id, e.target.value)}
                      className="w-full border-blue-500 ring-4 ring-blue-200 rounded-md p-2 text-sm"
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
