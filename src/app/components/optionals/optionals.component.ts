import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subject} from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OptativeService } from "../../services/optative.service";
import { InformationDialogComponent } from "../../commons/information-dialog/information-dialog.component";
import { AddOptionalDialogComponent } from "./add-optional-dialog/add-optional-dialog.component";
import Cookies from "js-cookie";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-optionals',
  templateUrl: './optionals.component.html',
  styleUrls: ['./optionals.component.scss']
})
export class OptionalsComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);
  public displayedColumns: string[] = ['select', 'name', 'professor', 'classroom'];
  public user: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private optativeService: OptativeService,
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

  private search(): void {
    this.optativeService.getAllOptatives()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.selection.clear();
      }, () => {
        this.selection.clear();
      });
  }

  public refresh(): void {
    this.router.navigate(['/administration/optionals'], {
      queryParams: {
        timeStamp: new Date().toTimeString()
      }
    }).then();
  }


  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public removeOptative(): void {
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
          this.optativeService.removeOptative(this.selection?.selected[0]?.id)
            .subscribe(() => {
              this._snackBar.open('Usuario eliminado correctamente');
              this.refresh();
            }, (error) => {
              this._snackBar.open(error?.error?.message ? error?.error?.message : 'No se ha podido eliminar la optativa');
            })
        }
      });
  }

  public addOptative(): void {
    const dialogRef: MatDialogRef<AddOptionalDialogComponent>
    = this.dialog.open(AddOptionalDialogComponent, {
      width: '420px',
      data: {
        isEditing: false,
        selectedOptative: null
      }
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.search();
      });
  }

  editOptative() {
    const dialogRef: MatDialogRef<AddOptionalDialogComponent>
      = this.dialog.open(AddOptionalDialogComponent, {
      width: '420px',
      data: {
        isEditing: true,
        selectedOptative: this.selection.selected[0]
      }
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.search();
      });
  }
}
