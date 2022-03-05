import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from "../../../services/utils/util.service";
import { UserService } from "../../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RequestService } from 'src/app/services/request.service';
import { OptativeService } from "../../../services/optative.service";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-request-dialog.component.html',
  styleUrls: ['./add-request-dialog.component.scss']
})
export class AddRequestDialogComponent {
  public optatives: any[] = [];
  private readonly userId: number;
  public requestForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddRequestDialogComponent>,
    private fb: FormBuilder,
    public utilService: UtilService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private requestService: RequestService,
    private optativeService: OptativeService
  ) {
    this.userId = data?.userId;
    if (!this.userId) {
      this.dialogRef.close();
    }
    this.getAllOptatives();
    this.createForm();
  }

  private createForm(): void {
    this.requestForm = this.fb.group({
      student: [this.userId, [Validators.required]],
      optative: [null, [Validators.required]],
    });
  }

  private getAllOptatives(): void {
    this.optativeService.getAllOptatives()
      .subscribe((data: any) => {
        this.optatives = data;
      })
  }

  public save(): void {
    if (this.requestForm.valid) {
      const data = JSON.parse(JSON.stringify(this.requestForm.value));

      this.requestService.createRequest(data)
        .subscribe(() => {
          this._snackBar.open('Usted ha creado su solicitud correctamente');
          this.dialogRef.close();
        }, (error) => {
          this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido crear la solicitud');
        })
    }
  }
}
