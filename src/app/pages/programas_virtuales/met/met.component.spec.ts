/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { METComponent } from './met.component';

describe('METComponent', () => {
  let component: METComponent;
  let fixture: ComponentFixture<METComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ METComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(METComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
