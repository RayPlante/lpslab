import { NgModule, PLATFORM_ID } from '@angular/core';

import { MetadataService, createMetadataService } from './nerdm.service'

/**
 * A module supporting NERDm record handling, including services and a display component
 */
@NgModule({
    declarations: [ ],
    providers: [
        { provide: MetadataService, useFactory: createMetadataService,
          deps: [ PLATFORM_ID ] },
    ],
    exports: [ ]
})
export class NerdmModule { }

