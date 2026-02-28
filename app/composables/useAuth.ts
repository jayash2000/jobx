import { registerSchema } from "../../shared/schemas/auth";

export const useRegisterForm = async () => {
  const form = useForm({
    validationSchema: toTypedSchema(registerSchema),
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    console.log("Form Values:", values);
  });

  return { ...form, onSubmit };
};
