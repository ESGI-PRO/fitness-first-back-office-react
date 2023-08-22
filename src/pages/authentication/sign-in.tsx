import { Button, Card, Label, TextInput, Spinner } from "flowbite-react";

import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

import { authService } from "../../services";

import type { FC } from "react";

const SignInPage: FC = function () {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  function onSubmit(data: any) {
    authService.login(data.email, data.password)
      .then((response: any) => {
        if (response.data.data.user.isAdmin) {
          toast.success('You are logged in');
          localStorage.setItem('token', response.data.data.token.access.token);
          console.log(response);
          navigate('/');
          window.location.reload();
        } else {
          toast.error('You are not authorized to access this page');
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 h-screen lg:gap-y-12">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Card
        horizontal
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto" disabled={formState.isSubmitting}>
              {formState.isSubmitting && 
                <>
                  <Spinner className="mr-2" />
                  <span className="text-white font-medium text-sm">
                    Loading...
                  </span>
                </>
              }
              Login to your account
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
