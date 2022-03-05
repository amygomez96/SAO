import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EMAIL_REGEX } from "../../../services/utils/globals";
import { UtilService } from "../../../services/utils/util.service";
import { UserService } from "../../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent {
  public isEditing: boolean = false;
  private readonly userId: number;
  public userForm: FormGroup;
  public formPassword: FormGroup;
  public roles: any[] = [
    {
      value: 2,
      name: 'Profesor'
    },
    {
      value: 3,
      name: 'Estudiante'
    }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    private fb: FormBuilder,
    public utilService: UtilService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.createForm();

    this.isEditing = data?.isEditing;
    if (this.isEditing) {
      this.userId = data?.selectedUser?.id;
      this.initForm(data?.selectedUser);
    }
  }

  private createForm(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      phone: [null],
      optional: [null],
      faculty: [null],
      role: [3, [Validators.required]]
    })

    this.formPassword = this.fb.group(
      {
        password: [null, [Validators.required]],
        repeat: [null, [Validators.required]]
      },
      {validator: AddStudentDialogComponent.matchValidator.bind(this)}
    );
  }

  private initForm(user?: any): void {
    this.userForm.patchValue({
      name: user?.name,
      last_name: user?.last_name,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      optional: user?.optional,
      faculty: user.faculty,
      role: 3
    });

    this.formPassword.get('password').clearValidators();
    this.formPassword.get('repeat').clearValidators();
    this.formPassword.updateValueAndValidity();
  }

  private static matchValidator(group: FormGroup): void {
    const pass = group.controls['password'];
    const repeat = group.controls['repeat'];

    if (pass.value !== repeat.value) {
      pass.setErrors({mismatch: true});
      repeat.setErrors({mismatch: true});
    } else {
      pass.setErrors(null);
      repeat.setErrors(null);
    }
  }

  public save(): void {
    if (this.userForm.valid && this.formPassword.valid) {
      const data = JSON.parse(JSON.stringify(this.userForm.value));

      if (!this.isEditing) {
        data.password = this.formPassword.get('password')?.value;

        this.userService.createUser(data)
          .subscribe(() => {
            this._snackBar.open('Usuario creado correctamente');
            this.dialogRef.close();
          }, (error) => {
            this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido crear el usuario');
          })
      } else {
        data.id = this.userId;
        this.userService.updateUser(data)
          .subscribe(() => {
            this._snackBar.open('Usuario editado correctamente');
            this.dialogRef.close();
          }, (error) => {
            this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido editar el usuario');
          })
      }
    }
  }
}
