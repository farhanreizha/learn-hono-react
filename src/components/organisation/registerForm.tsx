import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/query/auth";
import { formRegister, FormRegister } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { errorToastConfig, successToastConfig } from "@/config/toastConfig";

export default function RegisterForm() {
  const { mutate } = useRegister();

  const registerForm = useForm<FormRegister>({
    resolver: zodResolver(formRegister),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onRegisterSubmit = (value: FormRegister) => {
    mutate(value, {
      onSuccess: (data: { message: string }) => {
        toast.success(data.message, successToastConfig);
        window.location.replace("/");
      },
      onError: (error: Error) => {
        const errorMessage = error.message.split('"')[1].trim();
        toast.error(errorMessage, errorToastConfig);
      },
    });
    registerForm.reset();
  };

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
        <FormField
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Create your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Create a password" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </Form>
  );
}
