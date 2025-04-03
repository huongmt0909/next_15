"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FormControl } from "@/components/common/FormControl";
import { Button } from "@/components/common/Button";
import { CustomLink } from "@/components/common/CustomLink";
import {
  createMutation,
  useMutation,
} from "@/libs/hooks/react-query/useMutation";
import api from "@/constants/api";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const loginMutation = createMutation<LoginResponse, LoginFormData>(api.LOGIN);

const LoginPageView = () => {
  const t = useTranslations("LoginPage");
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { mutate, isPending } = useMutation<LoginResponse, LoginFormData>({
    mutation: loginMutation,
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful:", data);
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed:", error);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("title")}
          </h2>
        </div>

        <FormProvider {...methods}>
          <form
            className="mt-8 space-y-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="rounded-md shadow-sm space-y-4">
              <FormControl
                name="email"
                label={t("email")}
                placeholder={t("emailPlaceholder")}
                className="rounded-md"
                required
                isEmail
              />
              <FormControl
                name="password"
                type="password"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                className="rounded-md"
                required
                minLength={6}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FormControl
                  name="rememberMe"
                  type="checkbox"
                  label={t("rememberMe")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>

              <div className="text-sm">
                <CustomLink href="/forgot-password">
                  {t("forgotPassword")}
                </CustomLink>
              </div>
            </div>

            <Button
              type="submit"
              disabled={methods.formState.isSubmitting}
              isLoading={methods.formState.isSubmitting || isPending}
            >
              {methods.formState.isSubmitting ? t("signingIn") : t("submit")}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPageView;
