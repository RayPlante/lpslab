import { ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { Title }    from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { LandingModule } from './landing.module';
import { LandingComponent } from './landing.component';
import { AngularEnvironmentConfigService } from '../config/config.service';
import { AppConfig } from '../config/config'
import { MetadataTransfer, NerdmRes } from '../nerdm/nerdm'
import { MetadataService, TransferMetadataService } from '../nerdm/nerdm.service'
import * as mock from '../testing/mock.services';

describe('LandingComponent', () => {
    let component : LandingComponent;
    let fixture : ComponentFixture<LandingComponent>;
    let cfg : AppConfig;
    let plid : Object = "browser";
    let ts : TransferState = new TransferState();
    let nrd : NerdmRes;
    let mdt : MetadataTransfer;
    let mds : MetadataService;
    let route : ActivatedRoute;
    let title : mock.MockTitle;

    beforeEach(() => {
        cfg = (new AngularEnvironmentConfigService(plid, ts)).getConfig() as AppConfig;
        cfg.locations.pdrSearch = "https://goob.nist.gov/search";
        cfg.status = "Unit Testing";
        cfg.appVersion = "2.test";
        
        nrd = {
            "@type": [ "nrd:SRD", "nrdp:DataPublication", "nrdp:DataPublicResource" ],
            "@id": "goober",
            title: "All About Me!"
        }
        mdt = new MetadataTransfer();
        mdt.set("NERDm Resource:goober", nrd)
        mds = new TransferMetadataService(mdt);

        let r : unknown = new mock.MockActivatedRoute("/id/goober", {id: "goober"});
        route = r as ActivatedRoute;
    });

    let setupComponent = function() {
        TestBed.configureTestingModule({
            imports: [ LandingModule ],
            providers: [
                { provide: ActivatedRoute,  useValue: route },
                { provide: ElementRef,      useValue: null },
                { provide: Router,          useValue: null },
                { provide: AppConfig,       useValue: cfg },
                { provide: MetadataService, useValue: mds }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    it("should set title bar", function() {
        setupComponent();
        expect(component.getDocumentTitle()).toBe("PDR: "+nrd.title);
    });

    it("includes identity display", function() {
        setupComponent();
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector("h2"); 
        expect(el.textContent).toBe(nrd.title);

        el = cmpel.querySelector("lp-identity");
        expect(el).toBeDefined();
        expect(el).not.toBeNull();
        expect(el.children.length).toBeGreaterThan(0);
    });

});
