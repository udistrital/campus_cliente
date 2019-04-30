/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudDescuentoMatriculaComponent } from './crud-descuento_matricula.component';

describe('CrudDescuentoMatriculaComponent', () => {
  let component: CrudDescuentoMatriculaComponent;
  let fixture: ComponentFixture<CrudDescuentoMatriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudDescuentoMatriculaComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudDescuentoMatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
