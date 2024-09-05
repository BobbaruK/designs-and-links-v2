import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

interface Props {
  image: string | null | undefined;
}

export const CustomAvatar = ({ image }: Props) => {
  return (
    <Avatar className="border border-primary">
      <AvatarImage src={image || ""} />
      <AvatarFallback>
        <FaUser />
      </AvatarFallback>
    </Avatar>
  );
};
