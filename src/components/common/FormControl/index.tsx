"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import React from "react";

interface FormControlProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  isEmail?: boolean;
  isPassword?: boolean;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  showPasswordToggle?: boolean;
}

const CheckboxInput = ({
  name,
  label,
  className,
  register,
  rules,
  errors,
}: {
  name: string;
  label: string;
  className?: string;
  register: any;
  rules: any;
  errors: any;
}) => (
  <div className="flex items-center">
    <input
      {...register(name, rules)}
      id={name}
      type="checkbox"
      className={className}
    />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
    {errors[name] && (
      <p className="mt-1 text-sm text-red-600">
        {errors[name]?.message as string}
      </p>
    )}
  </div>
);

const DefaultInput = ({
  name,
  label,
  type,
  placeholder,
  className,
  register,
  rules,
  errors,
  showPassword,
  onTogglePassword,
}: {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
  register: any;
  rules: any;
  errors: any;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) => (
  <div>
    <label htmlFor={name} className="sr-only">
      {label}
    </label>
    <div className="relative">
      <input
        {...register(name, rules)}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
          onTogglePassword ? "pr-10" : ""
        } ${className}`}
      />
      {onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
        >
          {showPassword ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      )}
    </div>
    {errors[name] && (
      <p className="mt-1 text-sm text-red-600">
        {errors[name]?.message as string}
      </p>
    )}
  </div>
);

export const FormControl = ({
  name,
  label,
  type = "text",
  placeholder,
  className,
  isEmail,
  isPassword,
  minLength,
  maxLength,
  required = false,
  showPasswordToggle = true,
}: FormControlProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations("Validation");
  const [showPassword, setShowPassword] = React.useState(false);

  const getRules = () => {
    const rules: any = {};

    if (required) {
      rules.required = t("required", { field: label });
    }

    if (isEmail) {
      rules.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: t("email"),
      };
    }

    if (isPassword) {
      rules.pattern = {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: t("password"),
      };
    }

    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: t("minLength", { field: label, length: minLength }),
      };
    }

    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: t("maxLength", { field: label, length: maxLength }),
      };
    }

    return rules;
  };

  const rules = getRules();
  const commonProps = {
    name,
    label,
    className,
    register,
    rules,
    errors,
    showPassword:
      type === "password" && showPasswordToggle ? showPassword : undefined,
    onTogglePassword:
      type === "password" && showPasswordToggle
        ? () => setShowPassword(!showPassword)
        : undefined,
  };

  switch (type) {
    case "checkbox":
      return <CheckboxInput {...commonProps} />;
    default:
      return (
        <DefaultInput
          {...commonProps}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
        />
      );
  }
};
