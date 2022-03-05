import { Component, OnInit } from '@angular/core';
import Cookies from "js-cookie";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: any;

  constructor(
    private router: Router,
    private userService: UserService
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

}
