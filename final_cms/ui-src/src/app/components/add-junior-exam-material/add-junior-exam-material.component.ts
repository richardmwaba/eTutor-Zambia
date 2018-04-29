import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { timeout } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-junior-exam-material',
  templateUrl: './add-junior-exam-material.component.html',
  styleUrls: ['./add-junior-exam-material.component.css']
})
export class AddJuniorExamMaterialComponent implements OnInit {

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
