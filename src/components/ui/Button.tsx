"use client";

import {
  type ButtonHTMLAttributes,
  type PointerEvent,
  type Ref,
} from "react";
import { cn } from "@/utils/classNames";
import { useRipple } from "@/hooks/useRipple";

const buttonVariants = {
  variant: {
    darkBlue: "bg-[#29324b] text-white hover:bg-[#29324b]/80 hover:text-white active:bg-[#29324b]/80 active:text-white disabled:bg-[#29324b]/80 disabled:text-white",
    darkBlueGlow:
      "btn-darkBlueGlow bg-[#11141d] border border-[#313742] text-white transition-all duration-300 disabled:opacity-50",
    red: "bg-[#dc3545] text-white hover:bg-[#dc3545]/80 hover:text-white active:bg-[#dc3545]/80 active:text-white disabled:bg-[#dc3545]/80 disabled:text-white",
    green: "bg-[#0f7a3a] text-white hover:bg-[#0f7a3a]/80 hover:text-white active:bg-[#0f7a3a]/80 active:text-white disabled:bg-[#0f7a3a]/80 disabled:text-white",
    blue: "bg-[#1e5fa8] text-white hover:bg-[#1e5fa8]/80 hover:text-white active:bg-[#1e5fa8]/80 active:text-white disabled:bg-[#1e5fa8]/80 disabled:text-white",
    transparent:
      "bg-transparent text-gray hover:text-black disabled:text-gray",
    gold: "btn-elevated bg-gold [background-image:var(--background-image-gold-gradient)] border border-gold text-[#1c1c1c]",
    darkGradient:
      "btn-elevated bg-panel [background-image:var(--background-image-dark-gradient)] border border-gold-border text-white",
  },
  size: {
    sm: "h-8 px-3 text-sm rounded-md gap-1.5",
    md: "h-10 px-4 text-sm rounded-lg gap-2",
    lg: "h-12 px-6 text-base rounded-lg gap-2.5",
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  ripple?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "darkBlue",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth,
  ripple = false,
  disabled,
  children,
  type = "button",
  ref,
  onPointerDown,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const { waves, handlePointerDown: createRipple, removeWave } = useRipple({
    enabled: ripple,
    disabled: isDisabled,
  });

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(event);
    createRipple(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onPointerDown={handlePointerDown}
      className={cn(
        "inline-flex font-bold items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none",
        "cursor-pointer",
        (isDisabled || loading) && "cursor-not-allowed opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        fullWidth && "w-full",
        ripple && "ripple",
        className
      )}
      {...props}
    >
      {ripple
        ? waves.map((wave) => (
            <span
              key={wave.id}
              className="ripple-wave"
              style={{
                left: wave.x,
                top: wave.y,
                width: wave.size,
                height: wave.size,
              }}
              onAnimationEnd={() => removeWave(wave.id)}
              aria-hidden
            />
          ))
        : null}
      {loading ? (
        <span
          className="size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : (
        leftIcon
      )}
      {children ? <span>{children}</span> : null}
      {!loading ? rightIcon : null}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
