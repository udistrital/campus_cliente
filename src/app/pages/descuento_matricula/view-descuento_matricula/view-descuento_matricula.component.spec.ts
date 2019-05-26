/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ViewDescuentoMatriculaComponent } from './view-descuento_matricula.component';

describe('ViewDescuentoMatriculaComponent', () => {
  let component: ViewDescuentoMatriculaComponent;
  let fixture: ComponentFixture<ViewDescuentoMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDescuentoMatriculaComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDescuentoMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
