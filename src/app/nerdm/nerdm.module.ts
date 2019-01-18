import { NgModule } from '@angular/core';

/**
 * A module supporting NERDm record handling, including services and a display component
 */
@NgModule({
    declarations: [ ],
    providers: [
        { provide: MetadataService, useFactory: newMetadataService,
          deps: [ PLATFORM_ID ] },
    ],
    exports: [ ]
})
export class NerdmModule { }

