import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessorDialogComponent } from './add-professor-dialog.component';

describe('AddProfessorDialogComponent', () => {
  let component: AddProfessorDialogComponent;
  let fixture: ComponentFixture<AddProfessorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfessorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
