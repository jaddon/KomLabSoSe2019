import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/models/user';
import { UserService } from '@/services/user.service';
import { AuthenticationService } from '@/services/authentication.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  currentUser: User;
  users = [];
  constructor(
	private userService: UserService,
	private authenticationService: AuthenticationService
  ) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

}
