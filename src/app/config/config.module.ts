import { NgModule, InjectionToken } from '@angular/core';
import { AppConfig } from './config.ts'

/**
 * module providing the application configuration infrastructure
 */
@NgModule({
    declarations: [
        
        AppConfig,   // class that holds the app's configuration
        LPSConfig,   // LPS parameters (as an interface)
        WebLocations // named URLs used in page links
        
    ],
    providers: [
        /* config provider */
    ],
    exports: [
        AppConfig, LPSConfig, WebLocations
    ]
})
export class ConfigModule { }
