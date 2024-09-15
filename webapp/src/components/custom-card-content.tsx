import { CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  form: ReactNode;
  icon: ReactNode;
  formWidth?: number;
}

type ConditionalProps =
  | {
      label?: ReactNode;
      flag?: never;
      flagImgAlt?: never;
      flagFallBack?: never;
    }
  | {
      label?: never;
      flag?: string | null;
      flagImgAlt: string;
      flagFallBack: string;
    };

type ComponentProps = Props & ConditionalProps;

export const CustomCardContent = ({
  form,
  icon,
  label,
  flag,
  flagImgAlt,
  flagFallBack,
  formWidth = 450,
}: ComponentProps) => {
  return (
    <CardContent className="flex items-stretch p-0">
      <div
        className={cn(`w-full border-e border-e-secondary p-6`)}
        style={{
          maxWidth: formWidth,
        }}
      >
        {form}
      </div>
      <div className="relative grid grow place-items-center overflow-hidden p-6">
        {label && (
          <div className="absolute right-4 z-10 ms-4 line-clamp-1 max-w-full text-[100px] font-black text-primary opacity-50">
            {label}
          </div>
        )}
        {flag ? (
          <div className="absolute right-[-235px] top-[-150px] z-0 h-[850px] w-[850px] overflow-hidden rounded-full border border-secondary">
            <Image
              src={flag}
              alt={flagImgAlt || ""}
              unoptimized
              fill
              className="opacity-30"
            />
          </div>
        ) : (
          <div className="absolute right-4 z-10 line-clamp-1 max-w-full text-[100px] font-black text-primary opacity-20">
            {flagFallBack}
          </div>
        )}
        <div className="pointer-events-none relative z-0 opacity-20">
          {icon}
        </div>
      </div>
    </CardContent>
  );
};
