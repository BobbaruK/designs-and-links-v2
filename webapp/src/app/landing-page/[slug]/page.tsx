import { CustomAlert } from "@/components/custom-alert";
import { IconButton } from "@/components/button-icon";
import { CustomAvatar } from "@/components/custom-avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import {
  getDesignBySlug,
  getLandingPageBySlug,
  getSubDesignBySlug,
} from "@/lib/data/dl";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";

interface Props {
  params: {
    slug: string;
  };
}

const LandingPagePage = async ({ params: { slug } }: Props) => {
  const landingPage = await getLandingPageBySlug(slug);

  const user = await currentUser();

  return (
    <div className="container flex flex-col gap-6">
      {!landingPage ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-4xl font-bold">Landing page: {slug}</h1>
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/landing-page"}
                  label={"Back to landing pages"}
                />
              </div>
            </CardHeader>
          </Card>
          <CustomAlert
            title={"Error!"}
            description={`Seems like the landing page that you are looking for does not exist.`}
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">
                Landing page: {landingPage.name}
              </h1>
              <div className="ms-auto flex items-center justify-center gap-4">
                {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
                  <IconButton
                    icon={<CiEdit size={25} />}
                    href={`/landing-page/${landingPage.slug}/edit`}
                    label={"Edit landing page"}
                  />
                )}
                <IconButton
                  icon={<IoArrowBackCircleSharp size={25} />}
                  href={"/landing-page"}
                  label={"Back to landing pages"}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-4">
            <CustomAvatar
              image={
                landingPage.subDesign?.avatar || landingPage.design?.avatar
              }
              className="h-56 w-56 rounded-md"
            />
            <ol className="[&>li]:flex [&>li]:h-10 [&>li]:items-center [&>li]:gap-2">
              <li>
                <strong>Language:</strong>{" "}
                {landingPage.language ? (
                  <Link
                    href={`/language/${landingPage.language?.iso_639_1}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.language?.englishName}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No language
                  </>
                )}
              </li>
              <li>
                <strong>Requester:</strong>{" "}
                {landingPage.requester ? (
                  <Link
                    href={`/profile/${landingPage.requester.id}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.requester.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No requester
                  </>
                )}
              </li>
              <li>
                <strong>Brand:</strong>{" "}
                {landingPage.brand ? (
                  <Link
                    href={`/brand/${landingPage.brand?.slug}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.brand?.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No brand
                  </>
                )}
              </li>
              <li>
                <strong>Whatsapp:</strong>{" "}
                {landingPage.whatsapp ? (
                  <BsCheckCircle size={25} className="text-green-500" />
                ) : (
                  <IoIosCloseCircleOutline size={31} className="text-red-500" />
                )}
              </li>
              <li>
                <strong>FXORO Footer:</strong>{" "}
                {landingPage.fxoroFooter ? (
                  <BsCheckCircle size={25} className="text-green-500" />
                ) : (
                  <IoIosCloseCircleOutline size={31} className="text-red-500" />
                )}
              </li>
              <li>
                <strong>Topic:</strong>{" "}
                {landingPage.topic ? (
                  <Link
                    href={`/topic/${landingPage.topic.slug}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.topic.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No topic
                  </>
                )}
              </li>
              <li>
                <strong>License:</strong>{" "}
                {landingPage.license ? (
                  <Link
                    href={`/license/${landingPage.license.slug}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.license.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No license
                  </>
                )}
              </li>
              <li>
                <strong>Landing page type:</strong>{" "}
                {landingPage.lpType ? (
                  <Link
                    href={`/lp-type/${landingPage.lpType.slug}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.lpType.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No landing page type
                  </>
                )}
              </li>
              <li>
                <strong>Form validation:</strong>{" "}
                {landingPage.formValidation ? (
                  <Link
                    href={`/form-validation/${landingPage.formValidation?.slug}`}
                    className="underline underline-offset-2"
                  >
                    {landingPage.formValidation?.name}
                  </Link>
                ) : (
                  <>
                    <IoIosCloseCircleOutline
                      size={31}
                      className="text-red-500"
                    />
                    No form validation
                  </>
                )}
              </li>
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LandingPagePage;
