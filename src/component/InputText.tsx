import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

function InputText({
  labelTitle,
  labelStyle = "",
  type,
  containerStyle = "",
  value,
  placeholder,
  onChange,
}: {
  labelTitle?: string;
  labelStyle?: string;
  type?: HTMLInputTypeAttribute | undefined;
  containerStyle?: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label htmlFor={`${labelTitle}`} className="label">
        {labelTitle && (
          <span className={"label-text text-base-content " + labelStyle}>
            {labelTitle}
          </span>
        )}
      </label>
      <input
        type={type || "text"}
        value={value}
        id={labelTitle}
        placeholder={placeholder || ""}
        onChange={(e) => {
          onChange ? onChange(e) : () => {};
        }}
        className="input  input-bordered w-full "
      />
    </div>
  );
}

export default InputText;
