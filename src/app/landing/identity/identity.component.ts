import { Component, OnInit, Inject, Input } from '@angular/core';

import { AppConfig } from '../../config/config';
import { NerdmRes } from '../../nerdm/nerdm';

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
    
    @Input() md : NerdmRes = null;  // this should be set by the parent component

    /**
     * create the component.
     * @param cfg     the app configuration data
     * @param res     the container wiht the current resource metadata to display attached
     */
    constructor(private cfg : AppConfig) { }

    /**
     * initialize the component.  This is called early in the lifecycle of the component by 
     * the Angular rendering infrastructure.  
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
        switch (this.md["@type"][0]) {
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
