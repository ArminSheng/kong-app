import { useCallback } from "react";
import { useQueryClient } from "react-query";

export const Validation_Key = 'validation-result'

export type ErrorList = {[key: string]: string}

export function useValidationResult(group: string) {
    const queryClient = useQueryClient()
    const data = queryClient.getQueryData<ErrorList>([Validation_Key, group])
    const setter = useCallback((errs) => {
        queryClient.setQueryData([Validation_Key, group], errs)
    }, [queryClient, group])

    return [data, setter] as const
}