import { LoginForm } from "@/components/auth/login-form";

interface Props {
  searchParams: {
    error: string;
    callbackUrl: string;
  };
}

const LoginPage = ({ searchParams: { error, callbackUrl } }: Props) => {
  return (
    <div className="container grid h-full place-items-center">
      <LoginForm searchParamError={error} callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
