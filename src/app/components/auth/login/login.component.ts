import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public submitted = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    //console.log(this.loginForm.value.email);
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.SignIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
    }
  }
}
