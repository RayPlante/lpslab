import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppConfig } from '../config/config';
import { MetadataService } from '../nerdm/nerdm.service';
import { NerdmRes } from '../nerdm/nerdm';

/**
 * A component providing the complete display of landing page content associated with 
 * a resource identifier
 */
@Component({
    selector: 'app-landing',
    template: `
    <p> Landing Page: {{ id }} </p>
    `,
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    layoutCompact: boolean = true;
    layoutMode: string = 'horizontal';
    profileMode: string = 'inline';
    md : NerdmRes|null = null;
    id : string;

    /**
     * create the component.
     * @param route   the requested URL path to be fulfilled with this view
     * @param el      the element in the DOM where this component will be laid out.
     * @param router  the router to use to reroute output, if necessary
     * @param cfg     the app configuration data
     * @param mdserv  the MetadataService for gaining access to the NERDm metadata.
     */
    constructor(private route : ActivatedRoute, private el : ElementRef, private router : Router,
                private cfg : AppConfig, private mdserv : MetadataService)
    {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        console.log("initializing LandingComponent around id="+this.id);
        this.mdserv.getMetadata(this.id).subscribe(
            (data) => {
                // successful metadata request
                this.md = data;
                if (! this.md)
                    // id not found; reroute
                    this.router.navigateByUrl("/not-found", { skipLocationChange: true });
            },
            (err)  => {
                console.error("Failed to retrieve metadata: "+err.message);
                this.router.navigateByUrl("/internal-error", { skipLocationChange: true });
            }
        );
    }

}
