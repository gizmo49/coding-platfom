export const getErrorMessage = (error) => {
    const response = error?.response;
    const defaultMssg = "Something went wrong. Please try again.";
    const has500xError = response?.status?.toString?.()?.includes?.("50");
    const errorMessage = has500xError
        ? defaultMssg
        : response?.data
            ? response?.data?.message
            : defaultMssg;

    return errorMessage;
};