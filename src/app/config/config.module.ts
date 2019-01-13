import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserTransferStateModule, TransferState } from '@angular/platform-browser';

import { AppConfig, LPSConfig, WebLocations } from './config'
import { ConfigService, newConfigService } from './config.service'

export function getAppConfig(configService: ConfigService) : AppConfig | Promise<AppConfig> {
    return configService.getConfig();
}

/**
 * a service module providing the application configuration infrastructure.  Its 
 * ultimate purpose is to provide an AppConfig singleton, containing configuration 
 * data, making available for injection throughout the app.  
 */
@NgModule({
    providers: [
        { provide: ConfigService, useFactory: newConfigService,
          deps: [ PLATFORM_ID, TransferState ] },
        { provide: AppConfig, useFactory: getAppConfig, deps: [ ConfigService ] }
    ]
})
export class ConfigModule { }