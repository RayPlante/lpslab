import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppConfig } from '../config';
import { IdentityComponent } from './identity.component';
import { AuthorsComponent  } from './authors.component';
import { AppCommonModule } from '../../common/app.common.module'

/**
 * A module supporting the complete display of landing page content associated with 
 * a resource identifier
 */
@NgModule({
    imports: [
        CommonModule,
        AppCommonModule
    ],
    declarations: [
        IdentityComponent,
        AuthorsComponent
    ],
    providers: [
    ],
    exports: [
        IdentityComponent,
        AuthorsComponent
    ]
})
export class IdentityModule { }

export { IdentityComponent };
    
