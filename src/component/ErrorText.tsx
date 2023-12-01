import { ReactNode } from "react";

function ErrorText({
  styleClass,
  children,
}: {
  styleClass: string;
  children: ReactNode;
}) {
  return <p className={`text-center  text-error ${styleClass}`}>{children}</p>;
}

export default ErrorText;
