"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type GrowthData = {
  join_month: string; // "2024-01"
  member_count: number;
};

export function GrowthChart() {
  const [data, setData] = useState<GrowthData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/attendance");
      const json = await res.json();

      // Format to show "Jan", "Feb", etc.
      const formatted = json.map((item: GrowthData) => {
        const date = new Date(item.join_month + "-01");
        const month = date.toLocaleString("default", { month: "short" }); // Jan, Feb
        return {
          ...item,
          join_month: month,
        };
      });

      setData(formatted);
    }

    fetchData();
  }, []);

  return (
    <Card className="w-full max-w-sm bg-[#111827] border-none h-fit mt-5 text-white">
      <CardHeader>
        <CardTitle>Church Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="join_month" stroke="#fff" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#fff"
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#374151",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="member_count"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
