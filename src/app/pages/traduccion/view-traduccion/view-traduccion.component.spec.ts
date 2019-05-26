/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ViewTraduccionComponent } from './view-traduccion.component';

describe('ViewTraduccionComponent', () => {
  let component: ViewTraduccionComponent;
  let fixture: ComponentFixture<ViewTraduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTraduccionComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTraduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
