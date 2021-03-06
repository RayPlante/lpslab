import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AppConfig } from '../config';
import { LandingComponent } from './landing.component';
import { IdentityModule } from './identity/identity.module';

/**
 * A module supporting the complete display of landing page content associated with 
 * a resource identifier
 */
@NgModule({
    imports: [
        CommonModule,
        IdentityModule
    ],
    declarations: [
        LandingComponent
    ],
    providers: [
    ],
    exports: [
        LandingComponent
    ]
})
export class LandingModule { }

export { LandingComponent };
    
