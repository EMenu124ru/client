import { useSnackbar as useNotifications, VariantType } from "notistack";
import { ReactNode, useMemo } from "react";

export type SnackbarVariant = VariantType;
export const SnackbarVariants: Record<string, SnackbarVariant> = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
} as const;

interface SnackbarSettings {

  /** Notification show time in ms. */
  duration?: number;
}

type SnackFunction = (message: ReactNode, settings?: SnackbarSettings) => void;

export const useSnackbar = () => {
    const { enqueueSnackbar } = useNotifications();

    return useMemo<{
    snackError: SnackFunction;
    snackSuccess: SnackFunction;
    snackWarning: SnackFunction;
    snackInfo: SnackFunction;
  }>(() => {
      /**
     * Create typed notification.
     */
      function createVariant(variant: SnackbarVariant): SnackFunction {
          return (message, settings) => enqueueSnackbar(message, {
              autoHideDuration: settings?.duration,
              variant,
          });
      }

      return {
          snackError: createVariant(SnackbarVariants.ERROR),
          snackSuccess: createVariant(SnackbarVariants.SUCCESS),
          snackWarning: createVariant(SnackbarVariants.WARNING),
          snackInfo: createVariant(SnackbarVariants.INFO),
      };
  }, [enqueueSnackbar]);
};
