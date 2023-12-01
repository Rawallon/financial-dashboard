import { ReactNode } from "react";

function TitleCard({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
      <div className="text-xl font-semibold">{title}</div>

      <div className="divider mt-2"></div>

      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
}

export default TitleCard;
