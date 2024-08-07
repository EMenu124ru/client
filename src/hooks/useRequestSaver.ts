// React
// Types
import { RequestSaver } from "@models/RequestSaver";
// Axios
import { AxiosRequestConfig } from "axios";
import { useRef } from "react";

const useRequestSaver = () => {
    // Common State
    const requestSaverList = useRef<RequestSaver>({});

    /**
   * @description Clear all incoming or running request.
   *
   * @return Void.
   */
    const requestSaverAbortAll = (): void => {
        if (Object.keys(requestSaverList.current).length > 0) {
            // Abort incoming request
            Object.values(requestSaverList.current).forEach((requestSaver) => {
                if (!requestSaver.signal.aborted) {
                    requestSaver.abort();
                }
            });

            // Clear all request from state
            requestSaverList.current = {};
        }
    };

    /**
   * @description Abort some request according identifier.
   *
   * @param id
   *
   * @return Void.
   */
    const requestSaverAbort = (id: string): void => {
        const request = requestSaverList.current?.[id];

        // Check if request exists
        // Check if request is not aborted yet, if not aborted, abort it
        // In the end, clear the aborted request
        if (request && !request.signal.aborted) {
            // Abort the request
            request.abort();

            // Delete aborted request
            delete requestSaverList.current[id];
        }
    };

    /**
   * @description Set cancellation.
   *
   * @param id
   *
   * @return AxiosRequestConfig.
   */
    const requestSaverSetCancellation = (id: string): AxiosRequestConfig => {
    // Check if theres any request with the same identifier
    // Abort the request if exists
        if (requestSaverList.current?.[id]) {
            requestSaverAbort(id);
        }

        // Make instance of AbortController
        const abortController = new AbortController();

        // Make signal from abort controller to list
        requestSaverList.current[id] = abortController;

        // Return saved signal that stored to state
        return { signal: abortController.signal };
    };

    return {
        requestSaverAbortAll,
        requestSaverAbort,
        requestSaverSetCancellation,
    };
};

export { useRequestSaver };
