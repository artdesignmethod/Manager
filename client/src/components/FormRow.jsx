/* eslint-disable react/prop-types */

const FormRow = ({
  inputClass,
  labelClass,
  labelText,
  type,
  minLength,
  maxLength,
  name,
  onChange,
  defaultValue,
}) => {
  return (
    <div>
      <label htmlFor={name} className={labelClass || "light-label"}>
        {labelText || name}
      </label>

      <input
        className={inputClass || "form-input"}
        id={name}
        type={type}
        minLength={minLength || ""}
        maxLength={maxLength || ""}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};
export default FormRow;
