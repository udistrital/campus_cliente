/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MTMComponent } from './mtm.component';

describe('MTMComponent', () => {
  let component: MTMComponent;
  let fixture: ComponentFixture<MTMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MTMComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
