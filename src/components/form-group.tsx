import { Fragment, ReactNode, useCallback, useMemo } from 'react'
import { Field, FieldEntity, InputType, SchemaData } from '../data'
import { Button, DatePicker, Form, FormItemProps, Input, Radio, Switch } from 'antd'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'antd/lib/form/Form';
import { MultiSet } from './multi-input';
import { ErrorList, useValidationResult } from '../data/use-validation-result';

type FormGroupProps = {
    group: string,
    data?: SchemaData,
    isSubmitting: boolean,
    onSubmit: (values: any) => void,
}

/**
 * Single form panel
 * 
 * @returns 
 */
export function FormGroup({ data, group, isSubmitting, onSubmit }: FormGroupProps) {
    const [form] = useForm()

    const [errors] = useValidationResult(group)

    // Assemble form components
    const formItems = useMemo(() => buildForm(errors!, data?.fields), [data, errors])
    
    const onFinish = useCallback((values: any) => {
        onSubmit(values)
    }, [onSubmit])

    const onFinishFailed = useCallback((errorInfo: any) => {
        console.info('Failed:', errorInfo);
    }, []);

    const initialValues = useMemo(() => {
        if (!data?.fields) return null
        const initial: any = {}
        data?.fields.forEach(field => {
            const [fieldName, fieldObj] = Object.entries(field)[0]
            initial[fieldName] = fieldObj.default
            if (fieldObj.uuid) initial[fieldName] = uuidv4()
        })

        return initial
    }, [data?.fields])

    if (!initialValues) return null

    return (
        <>
            <div>{group}</div>
            <div className='divider' />
            <Form
                form={form}
                name={group}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={initialValues}
            >
                {
                    formItems?.map((item, idx) => <Fragment key={idx}>{item.component}</Fragment>)
                }

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}

/**
 * 
 * @param errors error list from validation
 * @param fields 
 * @returns form items map from fileds
 */
function buildForm(errors: ErrorList, fields?: Field[]) {
    return fields?.map(field => {
        const [fieldName, fieldObj] = Object.entries(field)[0]
        return buildFormItem(fieldName, fieldObj, errors)
    })
}

function buildFormItem(fieldName: string, field: FieldEntity, errors: ErrorList) {
    return {
        component: getFormComponent(field, fieldName, errors),
        label: fieldName,
        name: fieldName,
        required: field.required
    }
}

function getFormComponent(field: FieldEntity, fieldName: string, errors: ErrorList) {
    let component = null;
    const formItemProps: FormItemProps = {}

    switch (field.type) {
        case InputType.String:
        case InputType.Integer:
            if (field.timestamp) component = <DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} />
            else component = <Input type={field.type === InputType.Integer ? 'number' : ''} />
            break;
        case InputType.Set:
            component = <MultiSet field={field} />
            break;
        case InputType.Array:
            if (field.elements) {
                if (field.elements.type === 'string') component = <MultiSet field={field} />
            }
            break;
        case InputType.Boolean:
            component = <Switch />
            formItemProps.valuePropName = "checked"
            break;
    }
    return withFormItem(fieldName, field, component, errors, formItemProps)
}

function withFormItem(fieldName: string, field: FieldEntity, children: ReactNode, errors: any, formItemProps?: FormItemProps) {
    if (!children) return null
    
    return <>
        <Form.Item
            rules={[{ required: field.required, message: 'Required field missing' }]}
            name={fieldName}
            label={fieldName}
            required={field.required}
            {...formItemProps}
            help={errors?.[fieldName]}
            validateStatus={errors?.[fieldName] ? 'error' : ''}
        >
            {children}
        </Form.Item>
    </>
}
