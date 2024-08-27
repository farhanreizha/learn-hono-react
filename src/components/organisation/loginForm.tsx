import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/query/auth";
import { formLogin, FormLogin } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const { mutate } = useLogin();
  const loginForm = useForm<FormLogin>({
    resolver: zodResolver(formLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = (value: FormLogin) => {
    mutate(value, {
      onSuccess: (value: { message: string }) => {
        toast.success(value.message, {
          position: "top-right",
          className: "group toast group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
        });
      },
      onError: (error: Error) => {
        const errorMessage = error.message.split('"')[1].trim();
        toast.error(errorMessage, {
          position: "top-right",
          className: "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
        });
      },
    });
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
