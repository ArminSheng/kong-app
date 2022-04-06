import { message } from "antd";
import { useMutation } from "react-query";
import { postClient } from "./fetch";
import { useValidationResult, Validation_Key } from "./use-validation-result";

export function useValidate(api: string, group: string, postApi: string) {
    const [, set] = useValidationResult(group)
    return useMutation((variable: any) => postClient(api, {
        body: variable,
    }).then(res => {
        set(res?.fields || {})
        if (res.code === 2) message.error(res.message)
        else {
            message.success(res.message)
            postClient(postApi, {
                body: variable,
            })
        }
    }))
}
