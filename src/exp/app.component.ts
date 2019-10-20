import { Component } from '@angular/core';

/**
 * The Landing Page Service root Component.
 * 
 * This component loads into the app-root element in the app's index.html.  
 */
@Component({
    selector: 'app-root',
    template: `
    <!-- Container for sidebar(s) + page content -->
    <ng-sidebar-container>

      <!-- A sidebar -->
      <ng-sidebar [(opened)]="_opened">
        <p>Sidebar contents</p>
      </ng-sidebar>

      <!-- Page content -->
      <div ng-sidebar-content>
        <button (click)="_toggleSidebar()">Toggle sidebar</button>
      </div>

    </ng-sidebar-container>
    `,
    styleUrls: []
})
export class AppComponent {
    title = 'PDR Resource Landing Page'
    private _opened: boolean = false;

    private _toggleSidebar() {
      this._opened = !this._opened;
    }
}
