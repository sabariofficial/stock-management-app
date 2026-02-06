import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Snackbar } from '../../service/snackbar';
import { log } from 'node:console';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  pageTitle = "Inventory Mangement"
  loginForm!: FormGroup;
  loginData: any = {}
  isMail = ["test@gmail.com" , "guest"];
  isPassword = "Test@1234"
  loginError = ""

  constructor(
    private snackBarService: Snackbar,
    private router: Router,
    private route:ActivatedRoute
  ) { 
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  
  ngOnInit() {
  
  }

  private clearErrorAfterDelay(ms = 2000) {
    setTimeout(() => {
      this.loginError = '';
      console.log(this.loginError);
    }, ms);
  }

  getOnChangeLoginCredential(event:any, title:string) {
    this.loginData[title] = (event.target as HTMLInputElement).value;
  }

  onSubmit() {
    console.log(this.loginForm);
    
    const { email, password } = this.loginForm.value;

    if (email?.trim() === "") {
      this.loginError = "Please enter your name or email!";
      this.clearErrorAfterDelay()
      return;
    }

    if (password?.trim() === "") {
      this.loginError = "Please enter your password!";
      this.clearErrorAfterDelay()
      return;
    }

    const isLogin = this.isMail.includes(email) && password === this.isPassword;

    if (isLogin) {
      this.loginError = '';
      this.snackBarService.openSnackBar("User is Authenticated!");
      localStorage.setItem("user", JSON.stringify(this.loginData))
      const returnUrl = 'home/dashboard';
      this.router.navigate([returnUrl])
    } else {
      this.loginError = "Invalid email or password!";
      this.clearErrorAfterDelay()
    }

    console.log({ email, password });
    
  }
}
