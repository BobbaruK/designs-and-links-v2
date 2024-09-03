import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="flex items-center gap-4 text-6xl font-semibold text-foreground drop-shadow-md">
          Welcome to designs and links
        </h1>
        {!user && (
          <div>
            <LoginButton mode="modal" asChild>
              <Button variant={"secondary"} size={"lg"}>
                Sign in
              </Button>
            </LoginButton>
          </div>
        )}
      </div>
    </div>
  );
}
