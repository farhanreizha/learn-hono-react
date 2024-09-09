import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/organisation/loginForm";
import RegisterForm from "@/components/organisation/registerForm";

const Auth = () => {
  return (
    <Tabs defaultValue="login" className="w-full max-w-[400px] sm:max-w-[300px] lg:max-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
};

export default Auth;
