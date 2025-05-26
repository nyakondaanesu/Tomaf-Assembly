"use client";

import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Label } from "@/components/ui/label"; // Use lowercase 'l' to match 'label.tsx'
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
// Define Filters type here if not available elsewhere
export type Filters = {
  minAge?: number;
  maxAge?: number;
  gender?: string;
  occupation?: string;
  departments: string[];
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const allDepartments = [
  "Media",
  "Praise and Worship",
  "Administration",
  "Hospitality",
  "Ushering",
  "Welfare",
  "Prayer",
];

export default function FilterForm({ filters, onChange }: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleChange = (field: keyof Filters, value: any) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
    onChange(updated); // immediately send updated filters
  };

  const toggleDepartment = (dept: string) => {
    const updatedDepartments = localFilters.departments.includes(dept)
      ? localFilters.departments.filter((d) => d !== dept)
      : [...localFilters.departments, dept];

    handleChange("departments", updatedDepartments);
  };

  return (
    <div className="p-4 rounded-lg border bg-[#111827] text-white w-full max-w-2xl mx-auto shadow">
      <h2 className="text-lg font-semibold mb-4">Filter Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="minAge">Min Age</Label>
          <Input
            id="minAge"
            type="number"
            value={localFilters.minAge ?? ""}
            onChange={(e) => handleChange("minAge", Number(e.target.value))}
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="maxAge">Max Age</Label>
          <Input
            id="maxAge"
            type="number"
            value={localFilters.maxAge ?? ""}
            onChange={(e) => handleChange("maxAge", Number(e.target.value))}
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            value={localFilters.gender ?? ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            placeholder="e.g. Male or Female"
            className="text-black"
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={localFilters.occupation ?? ""}
            onChange={(e) => handleChange("occupation", e.target.value)}
            className="text-black"
          />
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2 block">Departments</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-black bg-white"
              >
                {localFilters.departments.length > 0
                  ? `Selected: ${localFilters.departments.join(", ")}`
                  : "Select Departments"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white text-black">
              <div className="flex flex-col gap-2">
                {allDepartments.map((dept) => (
                  <label key={dept} className="flex items-center gap-2">
                    <Checkbox
                      checked={localFilters.departments.includes(dept)}
                      onCheckedChange={() => toggleDepartment(dept)}
                    />
                    <span>{dept}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
