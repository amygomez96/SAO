import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionalDialogComponent } from './add-optional-dialog.component';

describe('AddOptionalDialogComponent', () => {
  let component: AddOptionalDialogComponent;
  let fixture: ComponentFixture<AddOptionalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOptionalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOptionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
