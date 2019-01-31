/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListProduccionArtesArquDisenoComponent } from './list-produccion_artes_arqu_diseno.component';

describe('ListProduccionArtesArquDisenoComponent', () => {
  let component: ListProduccionArtesArquDisenoComponent;
  let fixture: ComponentFixture<ListProduccionArtesArquDisenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduccionArtesArquDisenoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduccionArtesArquDisenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
