import { useForm, FormProvider, FieldPath } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthFormField from "../AuthFormField";
import { Button } from "@/components/ui/button";

interface AuthFormProps<T extends ZodTypeAny> {
  schema: T;
  onSubmit: (values: z.infer<T>) => void;
  fields: {
    name: string;
    label: string;
    placeholder: string;
    inputType?: string;
    description?: string;
  }[];
}

const AuthForm = <T extends ZodTypeAny>({ schema, onSubmit, fields }: AuthFormProps<T>) => {
  const formMethods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as z.infer<T>),
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <AuthFormField
            key={field.name}
            name={field.name as FieldPath<z.infer<T>>}
            label={field.label}
            placeholder={field.placeholder}
            inputType={field.inputType}
            description={field.description}
            formControl={formMethods.control}
          />
        ))}
        <div className="flex justify-center items-center">
          <Button type="submit" className="bg-secondary rounded-lg hover:bg-primary text-lg">Submit</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
