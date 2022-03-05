import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import Cookies from 'js-cookie';
import { Router } from "@angular/router";

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit{
  public user: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('user')
    if (!user){
      user = Cookies.get('user');
    }

    if (user) {
      user = JSON.parse(user);

      this.userService.getLoggedUser(user.id)
        .subscribe((data: any) => {
          this.user = data;
        })
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('account');
      Cookies.remove('user');
      Cookies.remove('account');
      this.router.navigate(['']).then();
    }
  }

  public logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('account');
    Cookies.remove('user');
    Cookies.remove('account');
    this.router.navigate(['']).then();
  }

}
