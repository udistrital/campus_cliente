/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTablaNotasComponent } from './list-tabla_notas.component';

describe('ListTablaNotasComponent', () => {
  let component: ListTablaNotasComponent;
  let fixture: ComponentFixture<ListTablaNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTablaNotasComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTablaNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
