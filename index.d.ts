interface EnvInterface {
  [key: string]:
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
}
declare class ConfigInstance {
  _env: EnvInterface;
  rawEnv: EnvInterface;
  appInfo: null | { [key: string]: string };
  configFn: null | ((key: string) => any);
  constructor(
    obj: {
      [key: string]: any;
    },
    envVars?: null | {
      [key: string]: undefined | null | string;
    },
    appInfo?: null | { [key: string]: string },
    configFn?: null | ((key: string) => any),
  );
  setConfigFn(configFn: null | ((key: string) => any)): this;
  setAppInfo(appInfo: { [key: string]: string }): { [key: string]: string };
  getAppInfo(): null | { [key: string]: string };
  dumpEnvVars(): EnvInterface;
  env(key: string):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
  envNullableString(key: string, nullifyObjects?: boolean): null | string;
  get(key: string):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
  sget(key: string): string;
  hasKey(key: number | string): boolean;
  parseItem(item: any):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
}
declare class Config {
  protected static configInstance: null | ConfigInstance;
  static init(
    obj: {
      [key: string]: any;
    },
    envVars: {
      [key: string]: undefined | string;
    },
    appInfo: undefined | { [key: string]: string },
    configFn: undefined | null | ((key: string) => any),
  ): Config;
  static isInit(): boolean;
  static setConfigFn(configFn: null | ((key: string) => any)): Config;
  static setAppInfo(appInfo: { [key: string]: string }): { [key: string]: string };
  static getAppInfo(): null | { [key: string]: string };
  static dumpEnvVars(): EnvInterface;
  static env(key: string):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
  static envNullableString(key: string, nullifyObjects?: boolean): null | string;
  static get(key: string):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
  static sget(key: string): string;
  static hasKey(key: string): boolean;
  static parseItem(item: any):
    | null
    | string
    | boolean
    | {
        [key: string]: any;
      };
}
export { Config };
export type { EnvInterface };
