import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useGetAuthQuery, useGetQuery } from "@/query/get";
import { Link } from "@tanstack/react-router";

export default function Home() {
  const { logout, isAuthenticated } = useAuth();
  const { data: authData } = useGetAuthQuery();
  const { data: unAuthData } = useGetQuery();

  return (
    <div className="flex flex-col gap-2">
      <span>{isAuthenticated ? authData?.data.title : unAuthData?.data.title}</span>
      <span>{isAuthenticated ? authData?.data.desc : unAuthData?.data.desc}</span>
      {!isAuthenticated ? (
        <Link to={"/auth"} className={cn(buttonVariants({ variant: "default" }), "size-max")}>
          Login
        </Link>
      ) : (
        <Button onClick={() => logout()} className={cn(buttonVariants({ variant: "default" }), "size-max")}>
          Logout
        </Button>
      )}
    </div>
  );
}
