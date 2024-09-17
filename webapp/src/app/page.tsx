import { LoginButton } from "@/components/auth/login-button";
import { CustomChart } from "@/components/custom-chart";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export default async function Home() {
  const user = await currentUser();

  const formValidations = await db.dL_FormValidation.count();
  const topics = await db.dL_Topic.count();
  const licenses = await db.dL_License.count();
  const landingPageTypes = await db.dL_LandingPageType.count();
  const languages = await db.dL_Language.count();
  const brands = await db.dL_Language.count();
  const designs = await db.dL_Design.count();
  const landingPages = await db.dL_LandingPage.count();

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
        <div>
          <CustomChart
            counters={{
              formValidations,
              topics,
              licenses,
              landingPageTypes,
              languages,
              brands,
              designs,
              landingPages,
            }}
          />
        </div>
      </div>
    </div>
  );
}
