import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  superUsers: any;

  constructor(
    private auth: AuthService,
    private http: Http 
  ) { }

  ngOnInit() {
    this.getSuperUsers();
  }

  getSuperUsers() {
    this.auth.getSuperUsers().subscribe(data => {
      this.superUsers = data;
    });
  }
}
