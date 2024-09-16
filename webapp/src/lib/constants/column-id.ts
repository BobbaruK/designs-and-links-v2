interface Props {
  id: string;
}

export const columnId = ({ id }: Props) => {
  return {
    id,
    accessorKey: id,
  };
};
