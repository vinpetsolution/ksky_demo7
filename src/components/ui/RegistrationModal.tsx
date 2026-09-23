"use client";

import { useState } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown";
import { toast } from "sonner";

const BANK_OPTIONS: DropdownOption[] = [
  { value: "KB국민은행", label: "KB국민은행" },
  { value: "신한은행", label: "신한은행" },
  { value: "우리은행", label: "우리은행" },
  { value: "하나은행", label: "하나은행" },
  { value: "NH농협은행", label: "NH농협은행" },
  { value: "IBK기업은행", label: "IBK기업은행" },
  { value: "SC제일은행", label: "SC제일은행" },
  { value: "HSBC은행", label: "HSBC은행" },
  { value: "전북은행", label: "전북은행" },
];

const PHONE_PREFIX_OPTIONS: DropdownOption[] = [
  { value: "010", label: "010" },
  { value: "011", label: "011" },
  { value: "016", label: "016" },
  { value: "017", label: "017" },
  { value: "018", label: "018" },
  { value: "019", label: "019" },
];

type Step = "select" | "form";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete?: () => void;
  onOpenLogin?: () => void;
}

interface FormErrors {
  userName?: string;
  nickName?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bank?: string;
  bankHolder?: string;
  bankNo?: string;
  transactionPassword?: string;
  agentCode?: string;
}

const inputBase = cn(
  "h-10 rounded-lg border border-line bg-white px-3",
  "text-ink placeholder:text-[#A89884]",
  "focus:outline-none focus:border-line",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

const inputError = "border-error focus:border-error";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="mt-1 text-xs text-error" role="alert">
      {message}
    </p>
  );
};

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    {open ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    )}
  </svg>
);

export function RegistrationModal({
  isOpen,
  onClose,
  onOpenLogin,
}: RegistrationModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedBank, setSelectedBank] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneMid, setPhoneMid] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankNo, setBankNo] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");

  const resetForm = () => {
    setUserName("");
    setNickName("");
    setPassword("");
    setConfirmPassword("");
    setPhoneMid("");
    setPhoneLast("");
    setPhonePrefix("010");
    setSelectedBank("");
    setBankHolder("");
    setBankNo("");
    setTransactionPassword("");
    setAgentCode("");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowTransactionPassword(false);
  };

  const handlePhoneInput = (value: string, setter: (val: string) => void) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 4) {
      setter(numbersOnly);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "아이디를 입력해주세요.";
    }

    if (!password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!phoneMid || !phoneLast) {
      newErrors.phone = "휴대폰번호를 입력해주세요.";
    }

    if (!selectedBank) {
      newErrors.bank = "출금은행을 선택해주세요.";
    }

    if (!bankHolder.trim()) {
      newErrors.bankHolder = "예금주를 입력해주세요.";
    }

    if (!bankNo.trim()) {
      newErrors.bankNo = "출금계좌를 입력해주세요.";
    }

    if (!transactionPassword.trim()) {
      newErrors.transactionPassword = "출금비밀번호를 입력해주세요.";
    }

    if (!agentCode.trim()) {
      newErrors.agentCode = "대리점 코드를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    toast.error("데모 페이지에서는 회원가입을 할 수 없습니다.");
    resetForm();
    setLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      showCloseButton
      closeOnOverlayClick={!loading}
      disabled={loading}
      className="max-w-120 lg:w-125"
      title={step === "form" ? "회원가입" : "지금 승리의 주인공이 되세요"}
      aria-label={step === "form" ? "회원가입" : "가입 방법 선택"}
      contentClassName={cn(
        step === "form" && "max-h-[70vh] overflow-y-auto",
      )}
    >
      {step === "select" ? (
        <div className="flex flex-col items-center px-2">

          <p className="mb-6 text-sm text-gray">
            원하시는 가입 방법을 선택해 주세요
          </p>

          <button
            type="button"
            onClick={() => setStep("form")}
            className={cn(
              "flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4.5 py-4",
              "border-[#c6a15b66] bg-[#c6a15b0f] text-left transition-all",
              "hover:border-gold hover:bg-[#c6a15b14]",
            )}
          >
            <span className="flex size-10.5 shrink-0 items-center justify-center rounded-full bg-[#c6a15b1f]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21h18v-2H3v2zM5 9v10h2V9H5zm4 0v10h2V9H9zm4 0v10h2V9h-2zm4 0v10h2V9h-2zM2 6h20V4H2v2zm2-4h16v2H4V2z" fill="white"></path><path d="M12 1L2 6h20L12 1z" fill="white" opacity="0.85"></path></svg>            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-bold text-ink">국내 계좌 가입</span>
              <span className="mt-0.5 block text-xs text-ink/60">
                본인 명의의 국내 은행 계좌로 가입
              </span>
            </span>
          </button>

          <p className="mt-3 text-center text-base text-ink">
            이미 회원이신가요?{" "}
            <button
              type="button"
              className="cursor-pointer underline font-medium text-gold hover:text-gold-bright"
              onClick={() => onOpenLogin?.()}
            >
              지금 로그인!
            </button>
          </p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="아이디"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                clearError("userName");
              }}
              className={cn(
                inputBase,
                "w-full",
                errors.userName && inputError,
              )}
              disabled={loading}
            />
            <ErrorText message={errors.userName} />
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
                clearError("nickName");
              }}
              className={cn(
                inputBase,
                "w-full",
                errors.nickName && inputError,
              )}
              disabled={loading}
            />
            <ErrorText message={errors.nickName} />
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                  clearError("password");
                  if (confirmPassword && newPassword !== confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "비밀번호가 일치하지 않습니다.",
                    }));
                  } else if (confirmPassword) {
                    clearError("confirmPassword");
                  }
                }}
                className={cn(
                  inputBase,
                  "w-full pr-10",
                  errors.password && inputError,
                )}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "absolute top-1/2 right-3 -translate-y-1/2 transition-colors",
                  errors.password
                    ? "text-error hover:text-error/80"
                    : "text-ink/70 hover:text-gold-deep",
                )}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <ErrorText message={errors.password} />
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비번확인"
                value={confirmPassword}
                onChange={(e) => {
                  const newConfirmPassword = e.target.value;
                  setConfirmPassword(newConfirmPassword);
                  if (password && newConfirmPassword !== password) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: "비밀번호가 일치하지 않습니다.",
                    }));
                  } else {
                    clearError("confirmPassword");
                  }
                }}
                className={cn(
                  inputBase,
                  "w-full pr-10",
                  errors.confirmPassword && inputError,
                )}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={cn(
                  "absolute top-1/2 right-3 -translate-y-1/2 transition-colors",
                  errors.confirmPassword
                    ? "text-error hover:text-error/80"
                    : "text-ink/70 hover:text-gold-deep",
                )}
                tabIndex={-1}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            <ErrorText message={errors.confirmPassword} />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-center text-sm text-gray">휴대폰번호 입력</p>
            <div className="flex gap-2">
              <Dropdown
                options={PHONE_PREFIX_OPTIONS}
                value={phonePrefix}
                onChange={setPhonePrefix}
                placeholder="010"
                position="bottom"
                className="w-25 shrink-0"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="중간번호"
                value={phoneMid}
                onChange={(e) => {
                  handlePhoneInput(e.target.value, setPhoneMid);
                  clearError("phone");
                }}
                maxLength={4}
                className={cn(
                  inputBase,
                  "min-w-0 flex-1",
                  errors.phone && inputError,
                )}
                disabled={loading}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="마지막번호"
                value={phoneLast}
                onChange={(e) => {
                  handlePhoneInput(e.target.value, setPhoneLast);
                  clearError("phone");
                }}
                maxLength={4}
                className={cn(
                  inputBase,
                  "min-w-0 flex-1",
                  errors.phone && inputError,
                )}
                disabled={loading}
              />
            </div>
            <ErrorText message={errors.phone} />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-center text-sm text-gray">출금계좌정보</p>
            <div className="flex gap-2">
              <Dropdown
                options={BANK_OPTIONS}
                value={selectedBank}
                onChange={(val) => {
                  setSelectedBank(val);
                  clearError("bank");
                }}
                placeholder="출금은행"
                position="bottom"
                className="min-w-0 flex-1"
                buttonClassName={errors.bank ? inputError : undefined}
              />
              <input
                type="text"
                placeholder="예금주 입력"
                value={bankHolder}
                onChange={(e) => {
                  setBankHolder(e.target.value);
                  clearError("bankHolder");
                }}
                className={cn(
                  inputBase,
                  "min-w-0 flex-1",
                  errors.bankHolder && inputError,
                )}
                disabled={loading}
              />
            </div>
            {(errors.bank || errors.bankHolder) && (
              <ErrorText message={errors.bank || errors.bankHolder} />
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="출금계좌 -없이 입력"
              value={bankNo}
              onChange={(e) => {
                const numbersOnly = e.target.value.replace(/\D/g, "");
                setBankNo(numbersOnly);
                clearError("bankNo");
              }}
              className={cn(inputBase, "w-full", errors.bankNo && inputError)}
              disabled={loading}
            />
            <ErrorText message={errors.bankNo} />
          </div>

          <div className="flex flex-col">
            <div className="relative">
              <input
                type={showTransactionPassword ? "text" : "password"}
                placeholder="출금비번입력"
                value={transactionPassword}
                onChange={(e) => {
                  setTransactionPassword(e.target.value);
                  clearError("transactionPassword");
                }}
                className={cn(
                  inputBase,
                  "w-full pr-10",
                  errors.transactionPassword && inputError,
                )}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowTransactionPassword(!showTransactionPassword)
                }
                className={cn(
                  "absolute top-1/2 right-3 -translate-y-1/2 transition-colors",
                  errors.transactionPassword
                    ? "text-error hover:text-error/80"
                    : "text-ink/70 hover:text-gold-deep",
                )}
                tabIndex={-1}
              >
                <EyeIcon open={showTransactionPassword} />
              </button>
            </div>
            <ErrorText message={errors.transactionPassword} />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 text-center text-sm text-gray">대리점 코드</p>
            <input
              type="text"
              placeholder="대리점 코드"
              value={agentCode}
              onChange={(e) => {
                setAgentCode(e.target.value);
                clearError("agentCode");
              }}
              className={cn(
                inputBase,
                "w-full",
                errors.agentCode && inputError,
              )}
              disabled={loading}
            />
            <ErrorText message={errors.agentCode} />
          </div>

          <div className="mt-2 flex gap-3 justify-between">
            <Button
              type="button"
              variant="red"
              className="h-9 rounded-md min-w-20 md:min-w-24"
              disabled={loading}
              onClick={() => setStep("select")}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="gold"
              className="h-9 rounded-md min-w-20 md:min-w-24"
              disabled={loading}
            >
              {loading ? "처리중..." : "회원가입"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
