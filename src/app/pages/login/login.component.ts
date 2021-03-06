import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../services/auth.service";
import { UserLogin, Branch } from "../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "pa-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public branches: Branch[] = [];

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    const emailRegex = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

    this.loginForm = this.formBuilder.group({
      email: ["boyet@gmail.com", Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ["W0JJXHASVeBtUEfi", Validators.compose([Validators.required])],
      branchName: ["B1", Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
    this.getBranches();
  }

  private getBranches(): void {
    this.loginService.getBranches().subscribe(response => {
      response.branches.forEach(b => {
        const branch: Branch = {
          label: b.name,
          value: b.name
        }
        this.branches.push(branch);
      });
      this.loginForm.get('branchName').patchValue(this.branches[0].label);
    })
    
  }
  public onChange(event: any): void {
    this.loginForm.get('branchName').patchValue(event.value);
  }

  public onLogin(): void {
    const cred: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      branch: this.loginForm.value.branchName
    }

    this.loginService.login(cred).subscribe(response => {
      if(response.status === true) {
        localStorage.setItem("u", JSON.stringify(response.user));

        this.router.navigateByUrl('dashboard')
      }
    }, (err) => {
      console.log(err);
    });
   
  }
}
