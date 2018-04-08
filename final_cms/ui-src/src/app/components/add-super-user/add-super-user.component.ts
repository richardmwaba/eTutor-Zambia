import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { timeout } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-super-user',
  templateUrl: './add-super-user.component.html',
  styleUrls: ['./add-super-user.component.css']
})
export class AddSuperUserComponent implements OnInit {
  firstname: String;
  lastname: String;
  email: String;
  username: String;
  password: String;

  groups = [ 'Tutor', 'Developer', 'Content Admin', 'System Admin'];

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    const superUser = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.firstname,
      password: this.password
    }

     //Validate required fields
     if(!this.validateService.validateRegister(superUser)){
       this.flashMessage.show('Please fill in all the required fields', { classes: ['alert-danger'], timeout: 3000 });
       return false;
     }

     //Validate email
     if(!this.validateService.validateEmail(superUser.email)){
      this.flashMessage.show('Please enter a valid email address', { classes: ['alert-danger'], timeout: 3000 });
      return false;
    }

    //Register Super User
    this.authService.addSuperUser(superUser).subscribe(data => {
        if(data.success){
          this.flashMessage.show('You have successfully added a new user', { classes: ['alert-success'], timeout: 3000 });
          this.router.navigate(['/users']);
        }
        else{
          this.flashMessage.show('Oops! Something went wrong', { classes: ['alert-danger'], timeout: 3000 });
          this.router.navigate(['/users']);
        }
    });

  }

}
