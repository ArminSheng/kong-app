import { PlusOutlined } from "@ant-design/icons"
import { Checkbox, Row, Input, Button } from "antd"
import { CheckboxGroupProps } from "antd/lib/checkbox"
import { useState, useCallback, ChangeEvent } from "react"
import { FieldEntity } from "../data"

type FormValueProps<T> = {
    value?: T,
    onChange?: (value: T) => void
}

type MultiSetProps = { field: FieldEntity } & FormValueProps<string[]>

export function MultiSet({ field, ...props }: MultiSetProps) {
    const items = field.mutually_exclusive_subsets || field.elements.one_of

    if (items) {
        return <Checkbox.Group value={props.value} onChange={props.onChange as CheckboxGroupProps['onChange']}>
            {
                items?.map((group: string[] | string, idx) =>
                    Array.isArray(group)
                        ? <Row key={idx}>{group.map(item => <Checkbox key={item} value={item}>{item}</Checkbox>)}</Row>
                        : <Checkbox key={group} value={group}>{group}</Checkbox>
                )
            }
        </Checkbox.Group>
    } else if (field.elements.type === 'string') {
        return <MultiInput {...props} />
    }

    return null
}

function MultiInput({ value, onChange }: FormValueProps<string[]>) {
    const [values, setVals] = useState(value?.length ? value : [''])
    const onInputChange = useCallback((idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
        values[idx] = e.target.value || ''
        setVals(values)
        onChange?.(values)
    }, [values, onChange])

    return <>
        {values?.map((str, idx) => (<Row style={{ marginBottom: '15px' }} key={idx}><Input onChange={onInputChange(idx)} /></Row>))}
        <Button
            type="dashed"
            onClick={() => {
                setVals(values.concat(['']))
            }}
            style={{ width: '100%', marginTop: '0' }}
            icon={<PlusOutlined />}
        >
            Add field
        </Button>
    </>
}