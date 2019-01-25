import * as jv from './property.component';
import { JSONViewModule } from './jsonview.module';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('JVPrimitiveComponent', function() {
    let cmp : jv.JVPropertyComponent;
    let fixture : ComponentFixture<jv.JVPropertyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ JSONViewModule ],
            providers: [ ]
        }).compileComponents();

        fixture = TestBed.createComponent(jv.JVPropertyComponent);
        cmp = fixture.componentInstance;
        cmp.name = "description";
        fixture.detectChanges();
    });

    it('property name, no link, no tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop")
        
        expect(el.classList.contains("withtip")).toBe(false);
        expect(cmpel.querySelector(".tiptext")).toBeNull();
        expect(cmpel.querySelector("a")).toBeNull();
        el = el.querySelector("span");
        expect(el.textContent).toBe("description");
    });

    it('property name, with link, no tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop")
        let alink = "http://who.am.i/description";
        cmp.link = alink;
        fixture.detectChanges();
        
        expect(el.classList.contains("withtip")).toBe(false);
        expect(cmpel.querySelector(".tiptext")).toBeNull();
        el = el.querySelector("a");
        expect(el).not.toBeNull();
        expect(el.href).toBe(alink);
        expect(el.textContent).toBe("description");
    });

    it('property name, with link, with tip', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop")
        let alink = "http://who.am.i/description";
        let def = "what it's about";
        cmp.tip = def;
        cmp.link = alink;
        fixture.detectChanges();

        expect(el.querySelector(".withtip")).not.toBeNull();
        el = el.querySelector(".tiptext");
        expect(el).not.toBeNull();
        expect(el.textContent).toBe(def);
        el = cmpel.querySelector("a");
        expect(el).not.toBeNull();
        expect(el.href).toBe(alink);
        expect(el.textContent).toBe("description");
    });

    it('property name, with tip, no link', function() {
        let cmpel = fixture.nativeElement;
        let el = cmpel.querySelector(".jv-prop")
        let def = "what it's about";
        cmp.tip = def;
        fixture.detectChanges();

        expect(el.querySelector(".withtip")).not.toBeNull();
        expect(cmpel.querySelector("a")).toBeNull();
        el = el.querySelector("span");
        expect(el.textContent).toBe("description");
        el = cmpel.querySelector(".tiptext");
        expect(el).not.toBeNull();
        expect(el.textContent).toBe(def);
    });
});

