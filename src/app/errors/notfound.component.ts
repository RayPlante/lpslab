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
    selector: 'not-found',
    template: `<p>Requested URL not found</p>`
})
export class NotFoundComponent implements OnInit {
    constructor(@Inject(PLATFORM_ID) private platid : object, private injector : Injector)
    {
        // an error here will get caught by the error handler; however,
        // the response status update does not take, nor does re-routing.
        // 
        // throw new Error("Testing error handling from component constructor");
    }
    
    ngOnInit() {
        if (isPlatformServer(this.platid)) {
            let resp : Response = this.injector.get(RESPONSE) as Response;
            resp.status(404);
        }

        // an error here will get caught by the error handler; updating the
        // HTTP status code and rerouting in the handler works.
        // 
        // throw new Error("Testing error handling from ngOnInit");
    }
}
