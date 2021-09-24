import type { AppInfo } from '@sotaoi/config/app-info';

interface EnvInterface {
  [key: string]: null | string | boolean | { [key: string]: any };
}

class ConfigInstance<AppInfoType extends AppInfo = AppInfo> {
  public _env: EnvInterface = {};
  public rawEnv: EnvInterface = {};
  public appInfo: null | AppInfoType = null;
  public configFn: null | ((key: string) => any);

  constructor(
    obj: { [key: string]: any },
    envVars: null | { [key: string]: undefined | null | string } = null,
    appInfo: null | AppInfoType = null,
    configFn: null | ((key: string) => any) = null,
  ) {
    let parsedItem = null;
    for (let key of Object.keys(obj)) {
      // @ts-ignore
      typeof key !== 'string' && (key = key.toString());
      parsedItem = this.parseItem(obj[key]);
      this._env[key.toLowerCase()] = parsedItem;
      this.rawEnv[key] = parsedItem;
    }

    if (typeof envVars === 'object' && envVars) {
      for (const [key, value] of Object.entries(envVars)) {
        if (typeof this._env[key.toLowerCase()] !== 'undefined') {
          continue;
        }
        parsedItem = this.parseItem(value);
        this._env[key.toLowerCase()] = parsedItem;
        this.rawEnv[key] = parsedItem;
      }
    }
    this.appInfo = appInfo;
    this.configFn = configFn;
  }

  public setConfigFn(configFn: null | ((key: string) => any)): this {
    this.configFn = configFn;
    return this;
  }

  public setAppInfo<AppInfoInlineType extends AppInfo = AppInfoType>(appInfo: AppInfoType): AppInfoInlineType {
    this.appInfo = appInfo;
    return JSON.parse(JSON.stringify(appInfo));
  }

  public getAppInfo<AppInfoInlineType extends AppInfo = AppInfoType>(): null | AppInfoInlineType {
    return JSON.parse(JSON.stringify(this.appInfo));
  }

  public dumpEnvVars(): EnvInterface {
    return { ...this.rawEnv };
  }

  public env(key: string): null | string | boolean | { [key: string]: any } {
    if (typeof key !== 'string') {
      return null;
    }
    key = key.toLowerCase();
    return typeof this._env[key] !== 'undefined' || this._env[key] !== undefined ? this._env[key] : null;
  }

  public envNullableString(key: string, nullifyObjects = false): null | string {
    const item = this.env(key);
    // @ts-ignore
    return typeof item === 'string' || item === null
      ? item
      : item === true || item === false
      ? null
      : nullifyObjects
      ? null
      : JSON.stringify(item);
  }

  public get(key: string): null | string | boolean | { [key: string]: any } {
    if (typeof key !== 'string') {
      return null;
    }
    key = key.toLowerCase();
    if (!this.configFn || typeof this.configFn !== 'function') {
      return null;
    }
    return this.configFn(key);
  }

  public sget(key: string): string {
    if (typeof key !== 'string') {
      return '';
    }
    key = key.toLowerCase();
    if (!this.configFn || typeof this.configFn !== 'function') {
      return '';
    }
    const result = this.configFn(key);
    return typeof result === 'string' ? result : '';
  }

  public hasKey(key: number | string): boolean {
    typeof key === 'number' && (key = key.toString());
    if (typeof key !== 'string') {
      return false;
    }
    return Object.keys(this._env).indexOf(key.toLowerCase()) !== -1;
  }

  public parseItem(item: any): null | string | boolean | { [key: string]: any } {
    try {
      return typeof item !== 'undefined' && item !== undefined ? item : null;
    } catch (err) {
      console.warn(err);
      return null;
    }
  }
}

class Config {
  protected static configInstance: null | ConfigInstance<any> = null;

  public static init<AppInfoType extends AppInfo = AppInfo>(
    obj: { [key: string]: any },
    envVars: { [key: string]: undefined | string },
    appInfo: undefined | AppInfoType,
    configFn: undefined | null | ((key: string) => any),
  ): Config {
    this.configInstance = new ConfigInstance(obj, envVars, appInfo || null, configFn || null);
    return this.configInstance;
  }

  public static isInit(): boolean {
    return !!this.configInstance;
  }

  public static setConfigFn(configFn: null | ((key: string) => any)): Config {
    return this.configInstance.setConfigFn(configFn);
  }

  public static setAppInfo<AppInfoType extends AppInfo = AppInfo>(appInfo: AppInfoType): AppInfoType {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.setAppInfo(appInfo);
  }

  public static getAppInfo<AppInfoType extends AppInfo = AppInfo>(): null | AppInfoType {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.getAppInfo();
  }

  public static dumpEnvVars(): EnvInterface {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.dumpEnvVars();
  }

  public static env(key: string): null | string | boolean | { [key: string]: any } {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.env(key);
  }

  public static envNullableString(key: string, nullifyObjects: boolean = false): null | string {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.envNullableString(key, nullifyObjects);
  }

  public static get(key: string): null | string | boolean | { [key: string]: any } {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.get(key);
  }

  public static sget(key: string): string {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return this.configInstance.sget(key);
  }

  public static hasKey(key: string): boolean {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return true;
  }

  public static parseItem(item: any): null | string | boolean | { [key: string]: any } {
    if (!this.configInstance) {
      throw new Error('Something went wrong, config instance does not exist');
    }
    return null;
  }
}

export { Config };
export type { EnvInterface };
