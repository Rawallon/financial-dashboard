import { ReactNode } from "react";

export function DropdownToggableChildren({
  title,
  children,
  titleStyle = "",
  contentStyle = "",
}: {
  title: ReactNode;
  children: ReactNode;
  titleStyle?: string;
  contentStyle?: string;
}) {
  return (
    <div className="collapse collapse-arrow">
      <input type="checkbox" name="group" className="peer" />
      <div className={`collapse-title text-xl font-medium ${titleStyle}`}>
        {title}
      </div>
      <div className={`collapse-content ${contentStyle}`}>
        <div className="form-control">{children}</div>
      </div>
    </div>
  );
}

export function Dropdown({
  titleNode,
  children,
  titleStyle = "",
  containerStyle = "",
}: {
  titleNode?: ReactNode;
  children: ReactNode;
  titleStyle?: string;
  containerStyle?: string;
}) {
  return (
    <details className="display-inline dropdown">
      <summary
        role="button"
        tabIndex={0}
        className={`m-1 btn bg-base-100 border border-base-content hover:border-base-content hover:bg-base-100 ${titleStyle}`}
      >
        {titleNode}
      </summary>
      <ul
        className={`p-2 shadow menu dropdown-content z-[1] bg-base-100 border border-base-content rounded-box w-60 ${containerStyle}`}
      >
        {children}
      </ul>
    </details>
  );
}

export default Dropdown;
