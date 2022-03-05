import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";
import Cookies from 'js-cookie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public form: FormGroup;
  public inputType: string = 'password'

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.userService.login(this.form.value)
        .subscribe((data: any) => {
          if (data?.token) {
            Cookies.set('account', data?.token);
            Cookies.set('user', JSON.stringify(data?.user));
            localStorage.setItem('account', data?.token);
            localStorage.setItem('user', JSON.stringify(data?.user));
            this.router.navigate(['/administration/home']).then();
          } else {
            this._snackBar.open('Usuario o contraseña incorrecta');
          }
        }, () => {
          this._snackBar.open('No se ha podido autenticar');
        })
    }
  }
}
