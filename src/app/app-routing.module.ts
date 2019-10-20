import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent, InternalErrorComponent } from './errors/errors.module';
import { LandingComponent } from './landing/landing.module';
import { StartWizardComponent } from './create/startwiz.component';
//import { BasicComponent } from './basic/basic.module';

/**
 * app-level routes
 */
const appRoutes : Routes = [
    { path: 'not-found', component: NotFoundComponent },
    { path: 'int-error', component: InternalErrorComponent },
    { path: 'id/:id',    component: LandingComponent },
    { path: 'create',    component: StartWizardComponent },
    { path: '',          component: NotFoundComponent,    pathMatch: 'full' },
    { path: '**',        redirectTo: 'not-found' }
];

/** 
 * routing module for the application level.  This module incorporates global error routing
 */
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
