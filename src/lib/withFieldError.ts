import { isFieldError } from "@models/fieldError";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError } from "axios";

interface WithFieldErrorProps<ResponseType> {
  handler: Promise<ResponseType>;
  rejectWithValue: GetThunkAPI<unknown>["rejectWithValue"];
}

export const withFieldError = async<ResponseType>({ handler, rejectWithValue }: WithFieldErrorProps<ResponseType>) => {
    try {
        return await handler;
    } catch (error: unknown) {
        if (error instanceof AxiosError && isFieldError(error)) {
            return rejectWithValue(error.response?.data?.detail[0]?.message[0] ?? error);
        }
        return rejectWithValue(error as Error);
    }
};
