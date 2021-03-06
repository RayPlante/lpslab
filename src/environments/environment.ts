/*
 * Angular build-time environments data.
 * 
 * Environment Label: dev (default)
 *
 * When building under the dev environment mode, the contents of this file will get built into 
 * the application.  
 *
 * This is the default version of this file.  When the app is built via `ng build --env=label`,
 * the contents of ./environment.label.ts will be used instead.  
 */
import { LPSConfig } from '../app/config/config';

export const context = {
    production: false
};

export const config : LPSConfig = {
    locations: {
        orgHome:     "https://nist.gov/",
        portalBase:  "https://data.nist.gov/",
        pdrHome:     "https://data.nist.gov/pdr/",
        pdrSearch:   "https://data.nist.gov/sdp/"
    },
    mode:        "dev",
    status:      "Dev Version",
    appVersion:  "v1.1.0",
    production:  context.production
}
