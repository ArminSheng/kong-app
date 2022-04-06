import { useQuery } from "react-query";
import { APIs, fetchClient } from "./fetch";

export type Field = {
    [key: string]: FieldEntity
}

export enum InputType {
    String = 'string',
    Integer = 'integer',
    Set = 'set',
    Array = 'array',
    Map = 'map',
    Boolean = 'boolean'
}

export type FieldEntity = {
    type: InputType,
    auto: boolean,
    timestamp?: boolean,
    default: any,
    elements: { type: string, one_of: string[] },
    mutually_exclusive_subsets: string[][],
    [key: string]: any
}

export type SchemaData = {
    fields: Field[]
}

export function useGetRoutesSchema() {
    return useQuery<SchemaData>('routes-schema', fetchClient(APIs.routes))
}

export function useGetConsumersSchema() {
    return useQuery<SchemaData>('consumers-schema', fetchClient(APIs.consumers))
}

export function useGetPluginsSchema() {
    return useQuery<SchemaData>('Plugins-schema', fetchClient(APIs.Plugins))
}
