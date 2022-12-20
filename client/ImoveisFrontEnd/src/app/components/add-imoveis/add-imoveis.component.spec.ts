import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImoveisComponent } from './add-imoveis.component';

describe('AddImoveisComponent', () => {
  let component: AddImoveisComponent;
  let fixture: ComponentFixture<AddImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImoveisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
