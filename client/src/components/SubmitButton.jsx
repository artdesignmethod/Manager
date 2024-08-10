/* eslint-disable react/prop-types */
import { useNavigation } from "react-router-dom";
const SubmitButton = ({ className, Submitting, Submit }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`form-button ${className} `}
      disabled={isSubmitting}
    >
      {isSubmitting ? Submitting : Submit}
    </button>
  );
};
export default SubmitButton;
