import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdHome } from "react-icons/md";

export default function NotFound() {
  return (
    <div className="container grid h-full place-items-center">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/" className="flex gap-2">
              <MdHome size={20} /> Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
