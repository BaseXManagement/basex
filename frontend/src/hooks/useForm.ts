import { useState, ChangeEvent, FormEvent } from 'react';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent, callback: () => void) => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof T, string>>>>;
}

export const useForm = <T extends Record<string, any>>(initialValues: T): FormState<T> => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    (Object.keys(values) as (keyof T)[]).forEach((key) => {
      if (!values[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = (event: FormEvent, callback: () => void) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      callback();
    } else {
      setErrors(newErrors);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
  };
};
