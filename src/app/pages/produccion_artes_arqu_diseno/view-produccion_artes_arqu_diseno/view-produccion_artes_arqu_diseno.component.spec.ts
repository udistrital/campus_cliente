/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ViewProduccionArtesArquDisenoComponent } from './view-produccion_artes_arqu_diseno.component';

describe('ViewProduccionArtesArquDisenoComponent', () => {
  let component: ViewProduccionArtesArquDisenoComponent;
  let fixture: ComponentFixture<ViewProduccionArtesArquDisenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProduccionArtesArquDisenoComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProduccionArtesArquDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
