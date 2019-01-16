import { NgModule } from '@angular/core';

import { NotFoundComponent } from './notfound.component';
import { InternalErrorComponent } from './internalerror.component';
import { AppErrorHandler } from './error'

export { NotFoundComponent, InternalErrorComponent, AppErrorHandler };

/**
 * module for error handling infrastructure
 */
@NgModule({
    declarations: [
        NotFoundComponent,        // displays message indicating not found
        InternalErrorComponent    // displays message about internal error.
    ],
    exports: [
        NotFoundComponent,
        InternalErrorComponent
    ]
})
export class ErrorsModule { }

