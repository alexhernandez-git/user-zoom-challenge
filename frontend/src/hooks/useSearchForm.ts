import { useFormik } from "formik";
import { UseFormikInterface } from "../types";

const useFormikForm = ({ initialValues, onSubmit }: UseFormikInterface) => {
  return useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: async (values) => {
      onSubmit(values);
    },
  });
};

export default useFormikForm;
