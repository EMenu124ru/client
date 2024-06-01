import { Box, CircularProgress } from "@mui/material";
import { CircularProgressProps } from "@mui/material/CircularProgress/CircularProgress";
import React, { FC } from "react";

type LoaderProps = CircularProgressProps;

export const Loader: FC<LoaderProps> = (props) => (
    <Box width="100%" display="flex" justifyContent="center">
        <CircularProgress {...props} />
    </Box>
);
