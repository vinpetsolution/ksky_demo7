"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/classNames";
import { IoChevronDown } from "react-icons/io5";
import { Button } from "./Button";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  position?: "bottom" | "top" | "auto";
  className?: string;
  buttonClassName?: string;
}

export function Dropdown({
  options,
  value = "",
  onChange,
  placeholder = "선택하세요.",
  position = "auto",
  className,
  buttonClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || position !== "auto" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const newPos =
      spaceBelow >= 200 || spaceBelow >= spaceAbove ? "bottom" : "top";
    const rafId = requestAnimationFrame(() => setDropdownPosition(newPos));
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, position]);

  const displayPosition = position === "auto" ? dropdownPosition : position;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Button
        variant="transparent"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-line bg-white px-3",
          "text-left text-sm text-ink",
          "focus:outline-none focus:border-line",
          buttonClassName,
        )}
        rightIcon={
          <IoChevronDown
            className={cn(
              "size-5 shrink-0 text-ink/70 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        }
      >
        <span className={selectedOption ? "text-ink" : "text-[#A89884]"}>
          {selectedOption?.label ?? placeholder}
        </span>
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute right-0 left-0 z-50 max-h-48 overflow-y-auto rounded-lg border border-line bg-white shadow-lg",
            "scrollbar-thin",
            displayPosition === "bottom" ? "top-full mt-1" : "bottom-full mb-1",
          )}
        >
          {options.map((opt, index) => (
            <Button
              variant="transparent"
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-start rounded-none px-3 py-2.5 text-left text-sm text-ink transition-colors",
                index === 0 && "rounded-t-lg",
                index === options.length - 1 && "rounded-b-lg",
                opt.value === value
                  ? "bg-cream text-ink hover:text-gold-deep"
                  : "hover:bg-[#F8F1E4] hover:text-gold-deep",
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
