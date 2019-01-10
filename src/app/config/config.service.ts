import { AppConfig, LPSConfig } from './config.ts';
import * as ngenv from '../../environments/environment';
import * as proc from 'process';
import * as fs from 'fs';

export const CONFIG_TS_KEY : string = "LPSConfig";

/**
 * create a deep copy of an object
 */
function deepCopy(obj) {
    // this implementation comes courtesy of and with thanks to Steve Fenton via
    // https://stackoverflow.com/questions/28150967/typescript-cloning-object/42758108
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }
 
    throw new Error("Unable to copy obj! Its type isn't supported.");
}


/**
 * a service that will create an AppConfig instance loaded with values 
 * approriate for the runtime context.
 */
export abstract class ConfigService {

    /**
     * return an AppConfig instance that is appropriate for the runtime 
     * context.
     */
    abstract getConfig() : AppConfig|Promise<AppConfig>; 
    
}

/**
 * A ConfigService that pulls it data from the environmental context
 * that Angular builds into the app.  
 * 
 * This service is intended for use in development mode running either as 
 * client-only in the browser or on the server.  
 */
class AngularEnvironmentConfigService extends ConfigService {
    private source : string = "angular-env";
    private defMode : string = "dev";

    /**
     * return an AppConfig instance that is appropriate for the runtime 
     * context.  This will asynchronously return an AppConfig rather than a 
     * Promise.  
     */
    getConfig() : AppConfig|Promise<AppConfig> {
        console.log("Loading development-mode configuration data from the Angular built-in environment");
        let data : LPSConfig = deepCopy(ngenv.config);
        let out : AppConfig = AppConfig(data);
        out["source"] = this.source;
        if (!out["env"]) 
            out["env"] = defMode;
        return out;
    }
}

/**
 * a ConfigService that reads in its data from a file on local disk.  
 * 
 * This will only work on the server.  The data is read in from a given
 * JSON-formatted file specified at construction.
 * 
 * This service is intended for when the LPS is running in a docker container 
 * from oar-docker.  The container launch script pulls configuration from the
 * config-server and writes it to a file.
 */
class ServerFileConfigService extends ConfigService {

    private source : string = "server-file";
    private defMode : string = "prod";       // i.e. in the docker context
    private out : AppConfig|null = null;

    /**
     * construct the service.  
     * 
     * @param cfgfile   the (full) path to the file to read JSON-encoded data from
     * @throw Error -- if OAR_CONFIG_FILE is not set or does not point to an 
     *                 existing file.  
     */
    constructor(private cfgfile : string) {
        if (! cfgfile)
            throw new Error("Configuration file not provided");
        if (! fs.existsSync(cfgfile))
            throw new Error(cfgfile + ": File not found");
        if (! fs.statSync(cfgfile).isFile())
            throw new Error(cfgfile + ": Not a file");
    }

    /**
     * return an AppConfig instance that is appropriate for the runtime 
     * context.  This implementation typically returns a Promise which will result in an 
     * Error if there is trouble reading the file.  If the data was successfully read
     * already, an actual AppConfig instance will be returned.
     */
    getConfig() : AppConfig|Promise<AppConfig> {
        if (out)
            return out;  // previously created AppConfig

        console.log("Loading configuration data from " + this.cfgfile);
        return new Promise<AppConfig>((resolve, reject) => {
            fs.readFile(this.cfgfile, 'utf8', (err, data) => {
                if (err) throw err;

                val cfg : LPSConfig = JSON.parse(data);
                cfg["source"] = source
                if (! cfg["mode"])
                    cfg["mode"] = defMode
                this.out = new AppInfo(cfg)
                
                resolve(this.out);
            });
        });
    }
}

/**
 * a ConfigService that pulls in data the transfer state
 */
class TransferStateConfigService extends ConfigService {

    private source : string = "transfer-state";
    private defMode : string = "prod";

    /**
     * create the service given a TransferState container
     */
    constructor(private cache : TransferState) {
        if (! cache.hasKey(CONFIG_TS_KEY))
            throw new Error("Config key not found in TransferState: " + CONFIG_TS_KEY);
    }

    /**
     * return an AppConfig instance that is appropriate for the runtime 
     * context.  This implementation extracts the configuration data from 
     * the transfer state.
     */
    getConfig() : AppConfig|Promise<AppConfig> {
        let data : LPSConfig = cache.get(CONFIG_TS_KEY) as LPSConfig;
        data["source"] = this.source;
        if (! data["mode"])
            data["mode"] = this.defMode;
        return new AppConfig(data);
    }
}

/**
 * return ConfigService appropriate for current runtime context.
 * 
 * If the app is running in the user's browser, the service will look for 
 * the returned service will load configuration data from the app's the 
 * transfer state.  If it is not there, we can assume that 
 * we are running in development-client-only mode and 
 * retrieve the data from the built-in environment.  If the app is running 
 * on the server, we can retrieve the data from a local file whose path
 * is set in the OS environment variable (OAR_CONFIG_FILE).  If that is 
 * not set, we can assume we are running in development-server mode.
 */
export newConfigService(@INJECT(PLATFORM_ID) platid : Object,
                        cache : TransferState)
    : ConfigService
{
    if (cache.hasKey(CONFIG_TS_KEY))
        // this means we're on (should be) on the browser side
        return new TransferStateConfigService(cache);

    if (isPlatformServer(this.platid) && proc.env["OAR_CONFIG_FILE"])
        // this means we're on the server in production-like mode
        return new TransferStateConfigService(proc.env["OAR_CONFIG_FILE"])

    return new AngularEnvironmentConfigService();
}
