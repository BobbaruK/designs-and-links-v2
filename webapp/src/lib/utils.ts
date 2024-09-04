import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const returnFormattedDate = (date: Date) => {
  const longMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = longMonths[date.getMonth()];
  const day =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();

  const hour =
    date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
  const minutes =
    date.getUTCMinutes() < 10
      ? `0${date.getUTCMinutes()}`
      : date.getUTCMinutes();
  const seconds =
    date.getUTCSeconds() < 10
      ? `0${date.getUTCSeconds()}`
      : date.getUTCSeconds();

  return `${day} ${month} ${year} - ${hour}:${minutes}:${seconds}`;
};
