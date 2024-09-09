import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useGetQuery } from "@/query/get";
import { Link } from "@tanstack/react-router";

export default function Home() {
  const { logout, isAuthenticated } = useAuth();
  const { data: get } = useGetQuery();

  return (
    <div className="flex flex-col">
      <span>{get?.data?.title}</span>
      <span>{get?.data?.desc}</span>
      {isAuthenticated ? (
        <Button onClick={() => logout()} className="size-max">
          Logout
        </Button>
      ) : (
        <Link className={cn(buttonVariants({ variant: "default" }), "size-max")} to="/auth">
          Login
        </Link>
      )}
    </div>
  );
}
