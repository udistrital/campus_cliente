import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdmisionComponent } from './detalle-admision.component';

describe('DetalleAdmisionComponent', () => {
  let component: DetalleAdmisionComponent;
  let fixture: ComponentFixture<DetalleAdmisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdmisionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
