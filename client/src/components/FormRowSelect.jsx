/* eslint-disable react/prop-types */
const FormRowSelect = ({
  name,
  labelText,
  labelClass,
  list,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className={labelClass || "dark-label"}>
        {labelText || name}
      </label>

      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
        required
      >
        {list.map((optionValue) => {
          return (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
