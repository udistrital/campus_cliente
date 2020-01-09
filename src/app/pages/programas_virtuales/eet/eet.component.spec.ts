/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { EETComponent } from './eet.component';

describe('EETComponent', () => {
  let component: EETComponent;
  let fixture: ComponentFixture<EETComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EETComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EETComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
