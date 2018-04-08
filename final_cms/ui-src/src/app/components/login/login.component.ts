import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const superUser = {
      username: this.username,
      password: this.password
    }

    //Validate required fields
    if (!this.validateService.validateLogin(superUser)) {
      this.flashMessage.show('Please fill in all the required fields', { classes: ['alert-danger'], timeout: 3000 });
      return false;
    }

    //Authenticate Super User
    this.authService.authenticateSuperUser(superUser).subscribe(data => {
      if(data.success){
        this.authService.storeSuperUserData(data.token, data.superUser);
        //this.flashMessage.show("You are now logged in", { classes: ['alert-success'], timeout: 5000 });
        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.flashMessage.show(data.msg, { classes: ['alert-danger'], timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });
  }
  


}
