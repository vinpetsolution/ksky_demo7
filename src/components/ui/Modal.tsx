"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/utils/classNames";
import { AnimatePresence, motion } from "@/lib/motion";
import { Button } from "./Button";

const modalPanelClassName = cn(
    "relative z-[2] flex w-full min-w-[300px] max-w-[95vw] max-h-[90vh] flex-col overflow-hidden rounded-xl py-3 px-4 lg:py-4 lg:px-6",
    "border-none",
    "bg-panel",
);

const modalCloseButtonClassName = cn(
    "absolute top-2.5 right-3.5 z-[5] text-ink hover:text-gold-deep/85 flex shrink-0 items-center justify-center p-0",
    "bg-transparent",
    "transition-all duration-350 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
);

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    /** Nhãn cho dialog (a11y). Nên set khi không có tiêu đề visible. */
    "aria-label"?: string;
    footer?: React.ReactNode;
    positionFooter?: "start" | "end" | "center";
    contentClassName?: string;
    disabled?: boolean;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children,
    className = "",
    showCloseButton = true,
    closeOnOverlayClick = true,
    "aria-label": ariaLabel,
    footer,
    positionFooter = "end",
    contentClassName = "",
    disabled = false,
    title,
}) => {
    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const handleOverlayClick = useCallback(() => {
        if (closeOnOverlayClick && !disabled) onClose();
    }, [closeOnOverlayClick, onClose, disabled]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !disabled) onCloseRef.current();
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open, disabled]);

    if (typeof document === "undefined") return null;

    const dialog = (
        <motion.div
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
            onClick={disabled ? undefined : handleOverlayClick}
        >
            <motion.div
                // initial={{ opacity: 0, y: 30, scale: 0.96 }}
                // animate={{ opacity: 1, y: 0, scale: 1 }}
                // exit={{ opacity: 0, y: 30, scale: 0.96 }}
                // transition={{ duration: 0.4 }}
                className={cn(modalPanelClassName, className)}
                onClick={(e) => e.stopPropagation()}
            >
                {title ? (
                    <h2 className="text-base lg:text-xl text-center font-bold text-ink lg:mb-3.5 mb-3">{title}</h2>
                ) : null}
                {showCloseButton ? (
                    <Button
                        variant="transparent"
                        type="button"
                        onClick={onClose}
                        disabled={disabled}
                        aria-label="Đóng"
                        className={modalCloseButtonClassName}
                    >
                        <IoMdClose className="size-6" aria-hidden />
                    </Button>
                ) : null}

                <div className={cn("min-h-0 flex-1", contentClassName)}>
                    {children}
                </div>

                {footer ? (
                    <div
                        className={cn(
                            "mt-4 flex shrink-0 items-center justify-end gap-3 border-t border-[rgba(255,180,210,0.14)] pt-4",
                            positionFooter === "start" && "justify-start",
                            positionFooter === "center" && "justify-center",
                        )}
                    >
                        {footer}
                    </div>
                ) : null}
            </motion.div>
        </motion.div>
    );

    return createPortal(
        <AnimatePresence>{open && dialog}</AnimatePresence>,
        document.body,
    );
};

export default Modal;
