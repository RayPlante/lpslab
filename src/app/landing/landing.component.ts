import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }    from '@angular/platform-browser';

import { AppConfig } from '../config/config';
import { MetadataService } from '../nerdm/nerdm.service';
import { NerdmRes, CurrentResource, CURRENT_RESOURCE, emptyCurrentResource } from '../nerdm/nerdm';

/**
 * A component providing the complete display of landing page content associated with 
 * a resource identifier.  This content is handle in various sub-components.
 * 
 * Features include:
 * * an "identity" section, providing title, names, identifiers, and who is repsonsible
 * * description section, providing thd prose description/abstract, keywords, terms, ...
 * * a data access section, including a file listing (if files are availabe) and other links
 * * a references section
 * * tools and navigation section.
 */
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    providers: [
        Title,
        { provide: CURRENT_RESOURCE, useFactory: emptyCurrentResource }
    ]
})
export class LandingComponent implements OnInit {

    layoutCompact: boolean = true;
    layoutMode: string = 'horizontal';
    profileMode: string = 'inline';
    // md : NerdmRes|null = null;
    // id : string;

    /**
     * create the component.
     * @param route   the requested URL path to be fulfilled with this view
     * @param router  the router to use to reroute output, if necessary
     * @param titleSv the Title service (used to set the browser's title bar)
     * @param cfg     the app configuration data
     * @param mdserv  the MetadataService for gaining access to the NERDm metadata.
     * @param res     a CurrentResource object for sharing the metadata and requested 
     *                 ID with child components.
     */
    constructor(private route : ActivatedRoute, private router : Router, private titleSv : Title, 
                private cfg : AppConfig, private mdserv : MetadataService,
                @Inject(CURRENT_RESOURCE) public res : CurrentResource)
    {
        this.res.reqId = this.route.snapshot.paramMap.get('id');
    }

    /**
     * initialize the component.  This is called early in the lifecycle of the component by 
     * the Angular rendering infrastructure.
     */
    ngOnInit() {
        console.log("initializing LandingComponent around id="+this.res.reqId);
        this.mdserv.getMetadata(this.res.reqId).subscribe(
            (data) => {
                // successful metadata request
                this.res.md = data;
                if (! this.res.md)
                    // id not found; reroute
                    this.router.navigateByUrl("/not-found", { skipLocationChange: true });
                else
                    // proceed with rendering of the component
                    this.useMetadata();
            },
            (err)  => {
                console.error("Failed to retrieve metadata: "+err.message);
                this.router.navigateByUrl("/internal-error", { skipLocationChange: true });
            }
        );
    }

    /**
     * make use of the metadata to initialize this component.  This is called asynchronously
     * from ngOnInit after the metadata has been successfully retrieved (and saved to this.res.md).
     * 
     * This method will:
     *  * set the page's title (as displayed in the browser title bar).
     *  * layout the display of the identity metadata
     */
    useMetadata() : void {
        // set the title bar title
        this.setTitleBar();
        
    }

    /**
     * set the browser's title bar title.  
     */
    setTitleBar() : void {
        let title = "PDR: ";
        if (this.res.md['abbrev']) title += this.res.md['abbrev'] + " - ";
        if (this.res.md['title'])
            title += this.res.md['title']
        else
            title += this.res.md['@id']
        this.titleSv.setTitle(title);
    }        

}
