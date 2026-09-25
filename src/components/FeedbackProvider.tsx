import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type SuccessOptions = {
  title: string;
  description: string;
  action?: string;
};

type ConfirmOptions = {
  title: string;
  description: string;
  action?: string;
};

type FeedbackValue = {
  success: (options: SuccessOptions) => Promise<void>;
  error: (message: string, description?: string) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const FeedbackContext = createContext<FeedbackValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState<(SuccessOptions & { close: () => void }) | null>(null);
  const [confirm, setConfirm] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(null);

  const value = useMemo<FeedbackValue>(
    () => ({
      success(options) {
        toast.success(options.title, { description: options.description });
        return new Promise((resolve) => {
          setSuccess({
            ...options,
            close: () => {
              setSuccess(null);
              resolve();
            },
          });
        });
      },
      error(message, description) {
        toast.error(message, description ? { description } : undefined);
      },
      confirm(options) {
        return new Promise((resolve) => {
          setConfirm({
            ...options,
            resolve: (ok) => {
              setConfirm(null);
              resolve(ok);
            },
          });
        });
      },
    }),
    [],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <Dialog open={Boolean(success)} onOpenChange={(open) => !open && success?.close()}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{success?.title}</DialogTitle>
            <DialogDescription className="text-base leading-relaxed">{success?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => success?.close()}>
              {success?.action || "Continue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={Boolean(confirm)} onOpenChange={(open) => !open && confirm?.resolve(false)}>
        <AlertDialogContent className="w-[calc(100%-2rem)]">
          <AlertDialogHeader>
            <AlertDialogTitle>{confirm?.title}</AlertDialogTitle>
            <AlertDialogDescription>{confirm?.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => confirm?.resolve(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirm?.resolve(true)}>
              {confirm?.action || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }
  return context;
}
