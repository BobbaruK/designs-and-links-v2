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
import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  params: {
    slug: string;
  };
}

const LandingPagePage = async ({ params: { slug } }: Props) => {
  const landingPage = await getLandingPageBySlug(slug);

  const user = await currentUser();

  const header: ReactNode = (
    <CardHeader className="border-b border-b-secondary">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">
          {!landingPage ? `Landing page: ${slug}` : landingPage.name}
        </h1>
        <div className="flex gap-4">
          {(user?.role === "EDITOR" || user?.role === "ADMIN") && (
            <IconButton
              icon={<CiEdit size={25} />}
              href={`/landing-page/${landingPage?.slug}/edit`}
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
  );

  return (
    <div className="container flex flex-col gap-6">
      {!landingPage ? (
        <>
          <Card>{header}</Card>
          <CustomAlert
            title={"Error!"}
            asset="landing page"
            variant="destructive"
          />
        </>
      ) : (
        <Card>
          {header}
          <CardContent className="flex gap-4 p-6">
            <CustomAvatar
              image={
                landingPage.subDesign?.avatar || landingPage.design?.avatar
              }
              className="h-56 w-56 rounded-md"
            />
            <Table className="">
              <TableCaption>
                A list of assets for this landing page.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset type</TableHead>
                  <TableHead>Asset</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">Language</TableCell>
                  <TableCell>
                    {landingPage.language ? (
                      <Link
                        href={`/language/${landingPage.language?.iso_639_1}`}
                        className="flex items-center justify-start gap-2 underline underline-offset-2"
                      >
                        <CustomAvatar
                          image={landingPage.language.flag}
                          className=""
                        />
                        {landingPage.language?.englishName}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No language
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Requester</TableCell>
                  <TableCell>
                    {landingPage.requester ? (
                      <Link
                        href={`/profile/${landingPage.requester.id}`}
                        className="flex items-center justify-start gap-2 underline underline-offset-2"
                      >
                        <CustomAvatar
                          image={landingPage.requester.image}
                          className=""
                        />
                        {landingPage.requester.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No requester
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Brand</TableCell>
                  <TableCell>
                    {landingPage.brand ? (
                      <Link
                        href={`/brand/${landingPage.brand?.slug}`}
                        className="flex items-center justify-start gap-2 underline underline-offset-2"
                      >
                        <CustomAvatar
                          image={landingPage.brand.logo}
                          className="w-32 rounded-md"
                        />
                        {landingPage.brand?.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No brand
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Whatsapp</TableCell>
                  <TableCell>
                    {landingPage.whatsapp ? (
                      <BsCheckCircle size={25} className="text-green-500" />
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">FXORO Footer</TableCell>
                  <TableCell>
                    {landingPage.fxoroFooter ? (
                      <BsCheckCircle size={25} className="text-green-500" />
                    ) : (
                      <IoIosCloseCircleOutline
                        size={31}
                        className="text-red-500"
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Topic</TableCell>
                  <TableCell>
                    {landingPage.topic ? (
                      <Link
                        href={`/topic/${landingPage.topic.slug}`}
                        className="underline underline-offset-2"
                      >
                        {landingPage.topic.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No topic
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">License</TableCell>
                  <TableCell>
                    {landingPage.license ? (
                      <Link
                        href={`/license/${landingPage.license.slug}`}
                        className="underline underline-offset-2"
                      >
                        {landingPage.license.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No license
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Landing page type</TableCell>
                  <TableCell>
                    {landingPage.lpType ? (
                      <Link
                        href={`/lp-type/${landingPage.lpType.slug}`}
                        className="underline underline-offset-2"
                      >
                        {landingPage.lpType.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No landing page type
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Form validation</TableCell>
                  <TableCell>
                    {landingPage.formValidation ? (
                      <Link
                        href={`/form-validation/${landingPage.formValidation?.slug}`}
                        className="underline underline-offset-2"
                      >
                        {landingPage.formValidation?.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No form validation
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Design</TableCell>
                  <TableCell>
                    {landingPage.design ? (
                      <Link
                        href={`/design/${landingPage.design?.slug}`}
                        className="flex items-center justify-start gap-2 underline underline-offset-2"
                      >
                        <CustomAvatar
                          image={landingPage.design.avatar}
                          className="w-32 rounded-md"
                        />
                        {landingPage.design?.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No design
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Sub design</TableCell>
                  <TableCell>
                    {landingPage.subDesign ? (
                      <Link
                        href={`/design/${landingPage.subDesign?.slug}`}
                        className="flex items-center justify-start gap-2 underline underline-offset-2"
                      >
                        <CustomAvatar
                          image={landingPage.subDesign.avatar}
                          className="w-32 rounded-md"
                        />
                        {landingPage.subDesign?.name}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-start gap-4">
                        <IoIosCloseCircleOutline
                          size={31}
                          className="text-red-500"
                        />
                        No sub design
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">URL</TableCell>
                  <TableCell>
                    <Link href={landingPage.url} target="_blank">
                      {landingPage.url}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LandingPagePage;
