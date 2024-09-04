import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";
import { FaTerminal } from "react-icons/fa6";

interface Props {
  title: string;
  description: string;
  icon?: ReactNode;
  variant?: "default" | "destructive";
}

export const CustomAlert = ({
  description,
  title,
  icon,
  variant = "default",
}: Props) => {
  return (
    <Alert variant={variant}>
      {icon || <FaTerminal />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
