import { Component, OnInit, Injector, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

/**
 * A Component that displays an error message indicating that a requested 
 * URL path could not be found (i.e. as in, a 404 status).  
 */
@Component({
    moduleId: module.id,
    selector: 'internal-error',
    template: `
<p>
We're sorry!  An internal error occurred while preparing your content.  Please try loading this 
page again.  If the error persists, please send the URL along to us at datasupport@nist.gov.
</p>
`
})
export class InternalErrorComponent implements OnInit {
    constructor(@Inject(PLATFORM_ID) private platid : object, private injector : Injector)
    { }
    
    ngOnInit() {
        if (isPlatformServer(this.platid)) {
            let resp : Response = this.injector.get(RESPONSE) as Response;
            resp.status(500);
        }
    }
}
