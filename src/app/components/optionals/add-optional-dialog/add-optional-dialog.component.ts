import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EMAIL_REGEX } from "../../../services/utils/globals";
import { UtilService } from "../../../services/utils/util.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OptativeService } from "../../../services/optative.service";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-optional-dialog.component.html',
  styleUrls: ['./add-optional-dialog.component.scss']
})
export class AddOptionalDialogComponent {
  public isEditing: boolean = false;
  private readonly optativeId: number;
  public optativeForm: FormGroup;
  public professors: any[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddOptionalDialogComponent>,
    private fb: FormBuilder,
    public utilService: UtilService,
    private _snackBar: MatSnackBar,
    private optativeService: OptativeService,
    private userService: UserService
  ) {
    this.createForm();
    this.getProfessors();

    this.isEditing = data?.isEditing;
    if (this.isEditing) {
      this.optativeId = data?.selectedOptative?.id;
      this.initForm(data?.selectedOptative);
    }
  }

  private getProfessors(): void {
    this.userService.getProfessors()
      .subscribe((data: any) => {
        this.professors = data;
      })
  }

  private createForm(): void {
    this.optativeForm = this.fb.group({
      name: [null, [Validators.required]],
      professor: [null, [Validators.required]],
      classroom: [null, [Validators.required]]
    });
  }

  private initForm(user?: any): void {
    this.optativeForm.patchValue({
      name: user?.name,
      professor: user?.professor,
      classroom: user?.classroom,
    });
  }

  public save(): void {
    if (this.optativeForm.valid) {
      const data = JSON.parse(JSON.stringify(this.optativeForm.value));


      if (!this.isEditing) {
        this.optativeService.createOptative(data)
          .subscribe(() => {
            this._snackBar.open('Asignatura optativa creada correctamente');
            this.dialogRef.close();
          }, (error) => {
            this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido crear la optativa');
          })
      } else {
        data.id = this.optativeId;
        this.optativeService.updateOptative(data)
          .subscribe(() => {
            this._snackBar.open('Asignatura optativa editada correctamente');
            this.dialogRef.close();
          }, (error) => {
            this._snackBar.open(error?.error?.message ? error?.error?.message :'No se ha podido editar la optativa');
          })
      }
    }
  }
}
