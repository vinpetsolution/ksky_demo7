"use client";

import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { demoLogin } from "@/app/actions/demoAuth";
import { persistDemoSession } from "@/utils/demoSession";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import {
  isMobileDevice,
  normalizeLoginUserIdCaseInsensitive,
} from "@/utils/loginUserId";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { MdVpnKey } from "react-icons/md";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp?: () => void;
}

const inputClassName = cn(
  "h-10 w-full rounded-lg border bg-transparent",
  "px-3 pl-10 text-base text-ink placeholder:text-[#A89884]",
  "focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const ERROR_USER_NAME = "아이디/전화번호는 필수입니다";
const ERROR_PASSWORD = "암호가 필요합니다";

export function LoginModal({ isOpen, onClose, onOpenSignUp }: LoginModalProps) {
  const { setCurrentUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ userName?: string; password?: string }>(
    {},
  );

  useEffect(() => {
    if (isOpen) {
      setUserName("");
      setPassword("");
      setShowPassword(false);
      setErrors({});
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: { userName?: string; password?: string } = {};
    if (!userName.trim()) nextErrors.userName = ERROR_USER_NAME;
    if (!password) nextErrors.password = ERROR_PASSWORD;

    if (nextErrors.userName || nextErrors.password) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const userNameForAuth = isMobileDevice()
        ? normalizeLoginUserIdCaseInsensitive(userName)
        : userName;
      const response = await demoLogin(userNameForAuth, password);

      if (response.success && response.result?.token) {
        persistDemoSession(response);
        setCurrentUser(response);
        toast.success("로그인 성공!");
        onClose();
        setUserName("");
        setPassword("");
        router.push("/game_casino");
      } else {
        toast.error(response.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-label="로그인"
      showCloseButton
      closeOnOverlayClick={!isLoading}
      disabled={isLoading}
      className="max-w-120 lg:w-125"
      contentClassName="pt-2"
      title="로그인"
    >
      <form
        id="login-form"
        className="flex w-full flex-col gap-3"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-id" className="text-base text-ink">
            아이디/휴대폰 번호
          </label>
          <div className="relative">
            <FaUser
              className={cn(
                "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2",
                errors.userName ? "text-error" : "text-ink",
              )}
              aria-hidden
            />
            <input
              id="login-id"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (errors.userName) {
                  setErrors((prev) => ({ ...prev, userName: undefined }));
                }
              }}
              className={cn(
                inputClassName,
                errors.userName
                  ? "border-error focus:border-error"
                  : "border-line focus:border-line",
              )}
              autoComplete="username"
              disabled={isLoading}
              aria-invalid={Boolean(errors.userName)}
              aria-describedby={
                errors.userName ? "login-id-error" : undefined
              }
            />
          </div>
          {errors.userName ? (
            <p id="login-id-error" className="pl-3 text-sm text-error" role="alert">
              {errors.userName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="login-password" className="text-base text-ink">
            비밀번호
          </label>
          <div className="relative">
            <MdVpnKey
              className={cn(
                "pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2",
                errors.password ? "text-error" : "text-ink",
              )}
              aria-hidden
            />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              className={cn(
                inputClassName,
                "pr-10",
                errors.password
                  ? "border-error focus:border-error"
                  : "border-line focus:border-line",
              )}
              autoComplete="current-password"
              disabled={isLoading}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
            />
            <button
              type="button"
              className={cn(
                "absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer",
                errors.password
                  ? "text-error hover:text-error/80"
                  : "text-ink hover:text-gold-deep",
              )}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              tabIndex={-1}
              disabled={isLoading}
            >
              {showPassword ? (
                <IoMdEyeOff className="size-5" aria-hidden />
              ) : (
                <IoEye className="size-5" aria-hidden />
              )}
            </button>
          </div>
          {errors.password ? (
            <p
              id="login-password-error"
              className="pl-3 text-sm text-error"
              role="alert"
            >
              {errors.password}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="gold"
          fullWidth
          ripple
          disabled={isLoading}
          className="mt-2 h-10 rounded-lg"
        >
          {isLoading ? "로그인 중...." : "로그인"}
        </Button>

        <p className="mt-2 text-center text-base text-ink">
          계정이 없으신가요?{" "}
          <button
            type="button"
            className="cursor-pointer font-medium underline text-gold hover:text-gold-bright"
            disabled={isLoading}
            onClick={() => {
              onClose();
              onOpenSignUp?.();
            }}
          >
            지금 가입하세요!
          </button>
        </p>
      </form>
    </Modal>
  );
}
