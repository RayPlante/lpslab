import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './notfound.component';

describe('NotFoundComponent', () => {
    let component : NotFoundComponent;
    let fixture : ComponentFixture<NotFoundComponent>;

    it('should contain expected content', () => {
        TestBed.configureTestingModule({
            declarations: [ NotFoundComponent ]
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeDefined();

        let cmpel = fixture.nativeElement;
        let pels = cmpel.querySelectorAll("p");
        expect(pels.length).not.toBeGreaterThan(1);
        expect(pels[0].textContent.includes("not found")).toBe(true)
    });
});
