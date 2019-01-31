/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrudProduccionArtesArquDisenoComponent } from './crud-produccion_artes_arqu_diseno.component';

describe('CrudProduccionArtesArquDisenoComponent', () => {
  let component: CrudProduccionArtesArquDisenoComponent;
  let fixture: ComponentFixture<CrudProduccionArtesArquDisenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProduccionArtesArquDisenoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProduccionArtesArquDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
