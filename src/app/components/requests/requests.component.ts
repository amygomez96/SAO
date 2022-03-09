import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../../services/user.service";
import { RequestService } from "../../services/request.service";
import { InformationDialogComponent } from "../../commons/information-dialog/information-dialog.component";
import Cookies from "js-cookie";
import { AddRequestDialogComponent } from "./add-request-dialog/add-request-dialog.component";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'student', 'optative', 'actions'];
  public user: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private requestService: RequestService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user')
    if (!user) {
      user = Cookies.get('user');
    }

    if (user) {
      user = JSON.parse(user);

      this.userService.getLoggedUser(user.id)
        .subscribe((data: any) => {
          this.user = data;
          this.search();
        }, () => {
          this.logOut();
        })
    } else {
      this.logOut();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  private logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('account');
    Cookies.remove('user');
    Cookies.remove('account');
    this.router.navigate(['']).then();
  }

  public search(): void {
    if (this.user?.role?.id === 1 || this.user?.role?.id === 2) {
      this.requestService.getAllRequest()
        .subscribe((data: any) => {
          this.dataSource = new MatTableDataSource(data);
          this.selection.clear();
        }, () => {
          this.selection.clear();
        });
    } else {
      this.requestService.getAllMineRequest(this.user?.id)
        .subscribe((data: any) => {
          this.dataSource = new MatTableDataSource(data);
          this.selection.clear();
        }, () => {
          this.selection.clear();
        });
    }
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public addRequest(): void {
    const dialogRef: MatDialogRef<AddRequestDialogComponent>
      = this.dialog.open(AddRequestDialogComponent, {
      width: '420px',
      data: {
        userId: this.user?.id
      }
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.search();
      });
  }

  public removeRequest(): void {
    const dialogRef: MatDialogRef<InformationDialogComponent>
      = this.dialog.open(InformationDialogComponent, {
      width: '420px',
      data: {
        title: null,
        message: '¿Estás seguro de que desea eliminar el usuario seleccionado?'
      }
    });

    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result?.action) {
          this.requestService.removeRequest(this.selection?.selected[0]?.id)
            .subscribe(() => {
              this._snackBar.open('Usuario eliminado correctamente');
              this.search();
            }, (error) => {
              this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido eliminar el usuario');
            })
        }
      });
  }

  public assignRequest(): void {
    this.requestService.assignRequest(this.selection.selected[0]?.id)
      .subscribe(() => {
        this._snackBar.open('Asignatura optativa asignada correctamente');
        this.search();
      }, () => {
        this._snackBar.open('Ha ocurrido un error al asignar optativa');
      });
  }
}
