import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppConfig } from '../config';
import { IdentityComponent } from './identity.component';
import { AuthorsComponent  } from './authors.component';

/**
 * A module supporting the complete display of landing page content associated with 
 * a resource identifier
 */
@NgModule({
    imports: [
        CommonModule
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
    
