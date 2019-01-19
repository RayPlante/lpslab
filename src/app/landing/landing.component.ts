import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title }    from '@angular/platform-browser';

import { AppConfig } from '../config/config';
import { MetadataService } from '../nerdm/nerdm.service';
import { NerdmRes } from '../nerdm/nerdm';

/**
 * A component providing the complete display of landing page content associated with 
 * a resource identifier
 */
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
    providers: [
        Title
    ]
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
     * @param titleSv the Title service (used to set the browser's title bar)
     * @param cfg     the app configuration data
     * @param mdserv  the MetadataService for gaining access to the NERDm metadata.
     */
    constructor(private route : ActivatedRoute, private el : ElementRef, private router : Router,
                private titleSv : Title, 
                private cfg : AppConfig, private mdserv : MetadataService)
    {
        this.id = this.route.snapshot.paramMap.get('id');
    }

    /**
     * initialize the component.  This is called early in the lifecycle of the component by 
     * the Angular rendering infrastructure.
     */
    ngOnInit() {
        console.log("initializing LandingComponent around id="+this.id);
        this.mdserv.getMetadata(this.id).subscribe(
            (data) => {
                // successful metadata request
                this.md = data;
                if (! this.md)
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
     * from ngOnInit after the metadata has been successfully retrieved (and saved to this.md).
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
        if (this.md['abbrev']) title += this.md['abbrev'] + " - ";
        if (this.md['title'])
            title += this.md['title']
        else
            title += this.md['@id']
        this.titleSv.setTitle(title);
    }        

}
