"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#3b82f6", "#ec4899", "#10b981"];

export default function PieChartCard() {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    async function fetchGenderData() {
      try {
        const res = await fetch("/api/gender");
        const json = await res.json();
        console.log("Gender data response:", json);

        setData([
          { name: "Male", value: Number(json.male) },
          { name: "Female", value: Number(json.female) },
        ]);
      } catch (err) {
        console.error("Error fetching gender data:", err);
      }
    }

    fetchGenderData();
  }, []);

  if (data.length === 0) {
    return <div className="text-white p-4">Loading chart...</div>;
  }

  return (
    <Card className="w-full max-w-sm bg-[#111827] border-none h-fit mt-5">
      <CardHeader>
        <CardTitle className="text-white">Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
