import type { AppInfo } from '@sotaoi/config/app-info';
interface EnvInterface {
    [key: string]: null | string | boolean | {
        [key: string]: any;
    };
}
declare class ConfigInstance<AppInfoType extends AppInfo = AppInfo> {
    _env: EnvInterface;
    rawEnv: EnvInterface;
    appInfo: null | AppInfoType;
    configFn: null | ((key: string) => any);
    constructor(obj: {
        [key: string]: any;
    }, envVars?: null | {
        [key: string]: undefined | null | string;
    }, appInfo?: null | AppInfoType, configFn?: null | ((key: string) => any));
    setConfigFn(configFn: null | ((key: string) => any)): this;
    setAppInfo<AppInfoInlineType extends AppInfo = AppInfoType>(appInfo: AppInfoType): AppInfoInlineType;
    getAppInfo<AppInfoInlineType extends AppInfo = AppInfoType>(): null | AppInfoInlineType;
    dumpEnvVars(): EnvInterface;
    env(key: string): null | string | boolean | {
        [key: string]: any;
    };
    envNullableString(key: string, nullifyObjects?: boolean): null | string;
    get(key: string): null | string | boolean | {
        [key: string]: any;
    };
    sget(key: string): string;
    hasKey(key: number | string): boolean;
    parseItem(item: any): null | string | boolean | {
        [key: string]: any;
    };
}
declare class Config {
    protected static configInstance: null | ConfigInstance<any>;
    static init<AppInfoType extends AppInfo = AppInfo>(obj: {
        [key: string]: any;
    }, envVars: {
        [key: string]: undefined | string;
    }, appInfo: undefined | AppInfoType, configFn: undefined | null | ((key: string) => any)): Config;
    static isInit(): boolean;
    static setConfigFn(configFn: null | ((key: string) => any)): Config;
    static setAppInfo<AppInfoType extends AppInfo = AppInfo>(appInfo: AppInfoType): AppInfoType;
    static getAppInfo<AppInfoType extends AppInfo = AppInfo>(): null | AppInfoType;
    static dumpEnvVars(): EnvInterface;
    static env(key: string): null | string | boolean | {
        [key: string]: any;
    };
    static envNullableString(key: string, nullifyObjects?: boolean): null | string;
    static get(key: string): null | string | boolean | {
        [key: string]: any;
    };
    static sget(key: string): string;
    static hasKey(key: string): boolean;
    static parseItem(item: any): null | string | boolean | {
        [key: string]: any;
    };
}
export { Config };
export type { EnvInterface };
