import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { DURATION, EASE_PREMIUM } from '../../lib/motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidthClass?: string;
}

export function Modal({ open, onClose, title, children, maxWidthClass = 'max-w-3xl' }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 20);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
            className={`relative flex max-h-[90dvh] w-full flex-col ${maxWidthClass} rounded-2xl bg-white shadow-2xl border border-[#E5E5E5] overflow-hidden`}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#E5E5E5] px-5 py-4 sm:px-6">
              <h2 className="font-display text-base sm:text-lg font-semibold text-[#101010] truncate">{title}</h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="btn-press inline-flex h-10 w-10 items-center justify-center rounded-full text-[#626262] hover:bg-[#F7F7F7] hover:text-[#101010] transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-5 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
