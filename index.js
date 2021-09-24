"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Config = void 0;
var ConfigInstance = /** @class */ (function () {
    function ConfigInstance(obj, envVars, appInfo, configFn) {
        if (envVars === void 0) { envVars = null; }
        if (appInfo === void 0) { appInfo = null; }
        if (configFn === void 0) { configFn = null; }
        this._env = {};
        this.rawEnv = {};
        this.appInfo = null;
        var parsedItem = null;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            // @ts-ignore
            typeof key !== 'string' && (key = key.toString());
            parsedItem = this.parseItem(obj[key]);
            this._env[key.toLowerCase()] = parsedItem;
            this.rawEnv[key] = parsedItem;
        }
        if (typeof envVars === 'object' && envVars) {
            for (var _b = 0, _c = Object.entries(envVars); _b < _c.length; _b++) {
                var _d = _c[_b], key = _d[0], value = _d[1];
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
    ConfigInstance.prototype.setConfigFn = function (configFn) {
        this.configFn = configFn;
        return this;
    };
    ConfigInstance.prototype.setAppInfo = function (appInfo) {
        this.appInfo = appInfo;
        return JSON.parse(JSON.stringify(appInfo));
    };
    ConfigInstance.prototype.getAppInfo = function () {
        return JSON.parse(JSON.stringify(this.appInfo));
    };
    ConfigInstance.prototype.dumpEnvVars = function () {
        return __assign({}, this.rawEnv);
    };
    ConfigInstance.prototype.env = function (key) {
        if (typeof key !== 'string') {
            return null;
        }
        key = key.toLowerCase();
        return typeof this._env[key] !== 'undefined' || this._env[key] !== undefined ? this._env[key] : null;
    };
    ConfigInstance.prototype.envNullableString = function (key, nullifyObjects) {
        if (nullifyObjects === void 0) { nullifyObjects = false; }
        var item = this.env(key);
        // @ts-ignore
        return typeof item === 'string' || item === null
            ? item
            : item === true || item === false
                ? null
                : nullifyObjects
                    ? null
                    : JSON.stringify(item);
    };
    ConfigInstance.prototype.get = function (key) {
        if (typeof key !== 'string') {
            return null;
        }
        key = key.toLowerCase();
        if (!this.configFn || typeof this.configFn !== 'function') {
            return null;
        }
        return this.configFn(key);
    };
    ConfigInstance.prototype.sget = function (key) {
        if (typeof key !== 'string') {
            return '';
        }
        key = key.toLowerCase();
        if (!this.configFn || typeof this.configFn !== 'function') {
            return '';
        }
        var result = this.configFn(key);
        return typeof result === 'string' ? result : '';
    };
    ConfigInstance.prototype.hasKey = function (key) {
        typeof key === 'number' && (key = key.toString());
        if (typeof key !== 'string') {
            return false;
        }
        return Object.keys(this._env).indexOf(key.toLowerCase()) !== -1;
    };
    ConfigInstance.prototype.parseItem = function (item) {
        try {
            return typeof item !== 'undefined' && item !== undefined ? item : null;
        }
        catch (err) {
            console.warn(err);
            return null;
        }
    };
    return ConfigInstance;
}());
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.init = function (obj, envVars, appInfo, configFn) {
        this.configInstance = new ConfigInstance(obj, envVars, appInfo || null, configFn || null);
        return this.configInstance;
    };
    Config.isInit = function () {
        return !!this.configInstance;
    };
    Config.setConfigFn = function (configFn) {
        return this.configInstance.setConfigFn(configFn);
    };
    Config.setAppInfo = function (appInfo) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.setAppInfo(appInfo);
    };
    Config.getAppInfo = function () {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.getAppInfo();
    };
    Config.dumpEnvVars = function () {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.dumpEnvVars();
    };
    Config.env = function (key) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.env(key);
    };
    Config.envNullableString = function (key, nullifyObjects) {
        if (nullifyObjects === void 0) { nullifyObjects = false; }
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.envNullableString(key, nullifyObjects);
    };
    Config.get = function (key) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.get(key);
    };
    Config.sget = function (key) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return this.configInstance.sget(key);
    };
    Config.hasKey = function (key) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return true;
    };
    Config.parseItem = function (item) {
        if (!this.configInstance) {
            throw new Error('Something went wrong, config instance does not exist');
        }
        return null;
    };
    Config.configInstance = null;
    return Config;
}());
exports.Config = Config;
