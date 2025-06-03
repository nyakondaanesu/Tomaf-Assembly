"use client";
import { FamilyDetailsData } from "../ttypes";
type MemberFamilyProps = {
  data: FamilyDetailsData;
  setData: (data: FamilyDetailsData) => void;
};

const MemberFamily = ({ data, setData }: MemberFamilyProps) => {
  const handleChange = (
    id: keyof FamilyDetailsData,
    value: string | number
  ) => {
    setData({
      ...data,
      [id]:
        id === "familySize" || id === "childrenCount" ? Number(value) : value,
    });
  };

  return (
    <form className="w-full max-w-5xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="noFamily"
          checked={data.noFamily}
          onChange={() => setData({ ...data, noFamily: !data.noFamily })}
        />
        <label htmlFor="noFamily" className="text-sm font-medium">
          I am not married / I don’t have dependents
        </label>
      </div>

      <fieldset
        disabled={data.noFamily}
        className={`space-y-6 transition-opacity ${
          data.noFamily ? "opacity-50" : "opacity-100"
        }`}
      >
        {[
          {
            id: "spouseName",
            label: "Spouse's Name",
            type: "text",
            placeholder: "John",
          },
          {
            id: "spouseID",
            label: "Spouse's ID No",
            type: "text",
            placeholder: "e.g 6312345678M19",
          },
          {
            id: "spouseContact",
            label: "Spouse's Contact Number",
            type: "text",
            placeholder: "+263...",
          },
          {
            id: "spouseOccupation",
            label: "Spouse's Occupation",
            type: "text",
            placeholder: "Teacher",
          },
          {
            id: "familySize",
            label: "Family Size",
            type: "number",
            placeholder: "e.g 5",
          },
          {
            id: "childrenCount",
            label: "Number of Children",
            type: "number",
            placeholder: "e.g 3",
          },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              value={
                typeof data[id as keyof FamilyDetailsData] === "boolean"
                  ? ""
                  : data[id as keyof FamilyDetailsData] !== undefined
                  ? String(data[id as keyof FamilyDetailsData])
                  : ""
              }
              placeholder={placeholder}
              onChange={(e) =>
                handleChange(id as keyof FamilyDetailsData, e.target.value)
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
