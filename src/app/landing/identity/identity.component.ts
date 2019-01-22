import { Component, OnInit, ElementRef, Inject } from '@angular/core';

import { AppConfig } from '../../config/config';
import { MetadataService } from '../../nerdm/nerdm.service';
import { NerdmRes, CurrentResource, CURRENT_RESOURCE } from '../../nerdm/nerdm';

/**
 * A component for displaying the identity metadata of a resource.  The identity information 
 * describe how the resource is referred to and who is responsible (e.g. title, authors, DOI, 
 * etc.)
 * 
 * Features include:
 * * a resource type label (e.g. "Data Publication" or "Public Data Resource"
 * * the resource title
 * * ...
 */
@Component({
    selector: 'lp-identity',
    templateUrl: './identity.component.html',
    styleUrls: ['./identity.component.css'],
    providers: [
    ]
})
export class IdentityComponent implements OnInit {

    layoutCompact: boolean = true;
    layoutMode: string = 'horizontal';
    profileMode: string = 'inline';
    resTypeName : string = "Resource";
    id : string;
    md : NerdmRes|null = null;

    /**
     * create the component.
     * @param route   the requested URL path to be fulfilled with this view
     * @param el      the element in the DOM where this component will be laid out.
     * @param cfg     the app configuration data
     * @param mdserv  the MetadataService for gaining access to the NERDm metadata.
     */
    constructor(private cfg : AppConfig, @Inject(CURRENT_RESOURCE) public res : CurrentResource)
    { }

    /**
     * initialize the component.  This is called early in the lifecycle of the component by 
     * the Angular rendering infrastructure.  This implementat fetches the metadata (which
     * should already be cached).  
     */
    ngOnInit() {
        this.useMetadata();
    }

    /**
     * make use of the metadata to initialize this component.  This is called asynchronously
     * from ngOnInit after the metadata has been successfully retrieved (and saved to this.md).
     * 
     * This method will:
     *  * layout the title and resource type
     */
    useMetadata() : void {
        switch (this.res.md["@type"][0]) {
            case "nrd:SRD":
                this.resTypeName = "Standard Reference Data";
                break;
            case "nrdp:DataPublication":
                this.resTypeName = "Data Publication";
                break;
            case "nrdp:PublicDataResource":
                this.resTypeName = "Public Data Resource";
                break;
            default:
                this.resTypeName = "Resource";
        }
    }
}
