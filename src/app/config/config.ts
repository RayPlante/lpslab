/**
 * Classes used to support the configuration infrastructure.  
 * 
 * Configuration parameters used by the application are defined in the form of
 * interfaces.  The AppConfig is an implementation of the app-level configuration
 * interface, LPSConfig, that can be injected into Components.  
 */
import { Injectable } from '@angular/core';

/**
 * URLs to remote locations used as links in templates
 */
export interface WebLocations {

    /**
     * the institutional home page (e.g. NIST)
     */
    orgHome: string,

    /**
     * the science portal base URL.  
     */
    portalBase?: string,

    /**
     * the home page for the PDR
     */
    pdrHome?: string,

    /**
     * the PDR search page (i.e. the SDP search page)
     */
    pdrSearch?: string,

    /**
     * the base URL for the distribution service
     */
    distService?: string,

    /**
     * the base URL for the metadata service
     */
    mdService?: string

    /**
     * the NERDm info page
     */
    nerdmAbout?: string

    /**
     * other locations are allowed
     */
    [locName: string]: any;
}

/**
 * the aggregation of parameters needed to configure the Landing Page Service
 */
export interface LPSConfig {

    /**
     * URLs used in links plugged into templates
     */
    locations: WebLocations;

    /**
     * Base URL for metadata service to use
     */
    mdAPI?: string;

    /**
     * a label to display (in the head bar) indicating the status of displayed interface.  
     *
     * This is usually populated in production contexts; example values
     * include "Review Version", "Dev Version".  
     */
    status?: string;

    /**
     * the interface version to display (in the head bar)
     */
    appVersion?: string;

    /**
     * other parameters are allowed
     */
    [propName: string]: any;
}

/**
 * a class implementation of the LPSConfig interface.  
 * 
 * This adds functions for specialized access to the parameters, such as
 * specifying a default value.  
 * 
 * See {@link LPSConfig} for property documentation.
 */
@Injectable()
export class AppConfig implements LPSConfig {

    locations : WebLocations;
    mdAPI     : string;
    status    : string;
    appVersion: string;

    /**
     * create an AppConfig directly from an LPSConfig object
     * @param params   the input data
     */
    constructor(params : LPSConfig) {
        for (var key in params) 
            this[key] = params[key];
    }

    /**
     * get hierarchical values by name with an option to request a default value.  
     * 
     * This function accomplishes two things:  first, it provides a bit of syntactic 
     * sugar for getting at deep values in the parameter hierarchy.  That is, 
     * `cfg.get("location.orgHome")` is equivalent to both `cfg.location.orgHome` and
     * `cfg["location"]["orgHome"]`.  If any of the property names are not one that is 
     * predefined as a class property, only the latter of the alternatives works.  
     *
     * The second bit of functionality is the optional parameter that allows the caller 
     * to set the default value to return if the value is not set.  If the stored value
     * is null or undefined, the default value is returned.  
     * 
     * @param param   the name of the desired parameter
     */
    get<T>(param : string, defval ?: T|null) : T|null|undefined {
        let names: string[] = param.split(".");
        let val : any = this;
        for (var i=0; i < names.length; i++) {
            if (typeof val != "object")
                return defval;
            val = val[names[i]];
        }
        return (val != undefined) ? val : defval;
    }

}
