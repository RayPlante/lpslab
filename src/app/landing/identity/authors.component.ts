import { Component, OnInit, Input } from '@angular/core';

import { AppConfig } from '../../config/config';
import { NerdmRes } from '../../nerdm/nerdm';

/**
 * a container for information describing an author.  The schema of this interface is 
 * the same as the NERDm resource type, Person.  
 */
export interface Person {

    /**
     * the person's full name in the preferred format.
     */
    fn : string;

    /**
     * other properties are expected (like familyName, givenName, affiliation, ...)
     */
    [propName: string]: any;
}

/**
 * A component for displaying the authors of a data publication.  If the provided list is 
 * is empty, nothing is displayed.  
 * 
 * Features include:
 * * initially, the authors are shown as simple listing of the names in order on a single line.
 * * the list ends with a expand/contract icon that, when pressed, toggles between the initial 
 *   brief view and an expanded view including affiliations and ORCIDs.  
 */
@Component({
    selector: 'lp-author-list',
    templateUrl:  './authors.component.html',
    providers: []
})
export class AuthorsComponent {
    layoutCompact: boolean = true;
    layoutMode: string = 'horizontal';
    profileMode: string = 'inline';
    expanded : boolean = false;

    @Input() authors : Person[] = null;   // set by parent component

    /**
     * create the component.
     * @param cfg     the app configuration data
     * @param authors the list of Person descriptions that constitute the list of authors.
     */
    constructor(private cfg : AppConfig) { }

    /**
     * Either expand or collapse the view of the authors and return True if the view 
     * is now (to be) expanded.
     */
    toggleView() {
        this.expanded = !this.expanded;
        return this.expanded;
    }
}
