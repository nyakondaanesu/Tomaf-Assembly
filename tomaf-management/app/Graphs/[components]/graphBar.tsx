"use client";

import { useEffect, useState } from "react";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define age group colors
const COLORS = {
  "0-12": "#60a5fa", // Blue
  "13-19": "#34d399", // Green
  "20-39": "#f59e0b", // Amber
  "40+": "#ef4444", // Red
};

export function GraphBar() {
  const [chartData, setChartData] = useState<
    { ageGroup: string; rawAgeGroup: string; count: number }[]
  >([]);

  useEffect(() => {
    async function fetchAgeData() {
      try {
        const res = await fetch("/api/age");
        const json = await res.json();
        console.log("age data response:", json);

        // Transform age group into multiline labels
        const formatted = json.map((item: any) => ({
          ageGroup: formatLabel(item.ageRange), // e.g. "0-12" => "Infants\n(0-12)"
          rawAgeGroup: item.ageRange,
          count: Number(item.count),
        }));

        setChartData(formatted);
      } catch (err) {
        console.error("Error fetching age data:", err);
      }
    }

    fetchAgeData();
  }, []);

  function formatLabel(ageRange: string) {
    switch (ageRange) {
      case "0-12":
        return "Infants\n(0-12)";
      case "13-19":
        return "Teens\n(13-19)";
      case "20-39":
        return "Youth\n(20-39)";
      case "40+":
        return "Elderly\n(40+)";
      default:
        return ageRange;
    }
  }

  return (
    <Card className="w-full max-w-sm bg-[#111827] border-none h-fit mt-5 text-white">
      <CardHeader>
        <CardTitle>Age Group Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ageGroup: {
              label: "Age Group",
              color: "#60a5fa",
            },
            count: {
              label: "Count",
              color: "#34d399",
            },
          }}
        >
          <BarChart
            width={350}
            height={300}
            data={chartData}
            margin={{ top: 20, left: 10, right: 10, bottom: 30 }}
          >
            <CartesianGrid vertical={false} stroke="#374151" />
            <XAxis
              dataKey="ageGroup"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={({ x, y, payload }) => {
                const lines = payload.value.split("\n");
                return (
                  <text x={x} y={y + 10} textAnchor="middle" fill="#fff">
                    {lines.map((line: string, index: number) => (
                      <tspan key={index} x={x} dy={index === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8} className="mt-2">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[entry.rawAgeGroup as keyof typeof COLORS] ||
                    "#8884d8"
                  }
                />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                offset={12}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
