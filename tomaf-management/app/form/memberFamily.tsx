"use client";

// Update the import path below if your types are located elsewhere
import { FamilyDetailsData } from "../ttypes";
type MemberFamilyProps = {
  data: FamilyDetailsData;
  setData: (data: FamilyDetailsData) => void;
};

const MemberFamily = ({ data, setData }: MemberFamilyProps) => {
  return (
    <form className="w-full max-w-5xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.noFamily}
          onChange={() => setData({ ...data, noFamily: !data.noFamily })}
        />
        <label className="text-sm font-medium">
          I am not married / I don’t have dependents
        </label>
      </div>

      <fieldset disabled={data.noFamily} className="space-y-6">
        {[
          ["spouseName", "Spouse's Name", "John"],
          ["spouseID", "Spouse's ID No", "xx-1234-X-12"],
          ["spouseContact", "Spouse's Contact Number", "+263..."],
          ["spouseOccupation", "Spouse's Occupation", "Teacher"],
          ["spouseContact", "Spouse's Contact Number", "+263..."],
          ["familySize", "Family Size", "5"],
          ["childrenCount", "Number of Children", "3"],
          ["nextOfKin", "Next of Kin", "Jane Doe"],
        ].map(([id, label, placeholder]) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              id={id}
              value={
                typeof data[id as keyof FamilyDetailsData] === "boolean"
                  ? data[id as keyof FamilyDetailsData]
                    ? "Yes"
                    : ""
                  : (data[id as keyof FamilyDetailsData] as
                      | string
                      | number
                      | undefined) ?? ""
              }
              placeholder={placeholder}
              onChange={(e) =>
                setData({ ...data, [id]: e.target.value } as FamilyDetailsData)
              }
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
        ))}
      </fieldset>
    </form>
  );
};

export default MemberFamily;
