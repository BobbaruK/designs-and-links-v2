"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

export const description = "A bar chart with an active bar";

const chartData = [];

interface ChartData {
  asset: string;
  items: number;
  fill: string;
}

interface Props {
  counters: {
    formValidations: number;
    topics: number;
    licenses: number;
    landingPageTypes: number;
    languages: number;
    brands: number;
    designs: number;
    landingPages: number;
  };
}

export function CustomChart({
  counters: {
    formValidations,
    topics,
    licenses,
    landingPageTypes,
    languages,
    brands,
    designs,
    landingPages,
  },
}: Props) {
  const [chartData, setChartData] = useState<ChartData[]>([
    {
      asset: "formValidation",
      items: formValidations,
      fill: "var(--color-formValidation)",
    },
    { asset: "topics", items: topics, fill: "var(--color-topics)" },
    { asset: "licenses", items: licenses, fill: "var(--color-licenses)" },
    { asset: "lpType", items: landingPageTypes, fill: "var(--color-lpType)" },
    { asset: "languages", items: languages, fill: "var(--color-languages)" },
    { asset: "brands", items: brands, fill: "var(--color-brands)" },
    { asset: "designs", items: designs, fill: "var(--color-designs)" },
    {
      asset: "landingPages",
      items: landingPages,
      fill: "var(--color-landingPages)",
    },
  ]);

  const chartConfig = {
    items: {
      label: "Items",
    },
    formValidation: {
      label: "Form Validations",
      color: "hsl(var(--chart-1))",
    },
    topics: {
      label: "Topics",
      color: "hsl(var(--chart-2))",
    },
    licenses: {
      label: "Licenses",
      color: "hsl(var(--chart-3))",
    },
    lpType: {
      label: "LP Types",
      color: "hsl(var(--chart-4))",
    },
    languages: {
      label: "Languages",
      color: "hsl(var(--chart-5))",
    },
    brands: {
      label: "Brands",
      theme: {
        light: "#2eb88a",
        dark: "#257f61",
      },
    },
    designs: {
      label: "Designs",
      theme: {
        light: "#e64edb",
        dark: "#bb23b6",
      },
    },
    landingPages: {
      label: "Landing Pages",
      theme: {
        light: "#c7b91f",
        dark: "#887f1b",
      },
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid
          vertical={false}
          height={10}
          horizontalValues={[0, 10, 20, 30]}
        />
        <XAxis
          dataKey="asset"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="items"
          strokeWidth={2}
          radius={8}
          activeIndex={-1}
          activeBar={({ ...props }) => {
            return (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            );
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}
