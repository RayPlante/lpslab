import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalErrorComponent } from './internalerror.component';

describe('InternalErrorComponent', () => {
    let component : InternalErrorComponent;
    let fixture : ComponentFixture<InternalErrorComponent>;

    it('should contain expected content', () => {
        TestBed.configureTestingModule({
            declarations: [ InternalErrorComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(InternalErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeDefined();

        let cmpel = fixture.nativeElement;
        let pels = cmpel.querySelectorAll("p");
        expect(pels.length).not.toBeGreaterThan(1);
        expect(pels[0].textContent.includes("internal error")).toBe(true)
    });
});
