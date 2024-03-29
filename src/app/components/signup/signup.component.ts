import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  alreadyExist: string = '';
  signupForm!: FormGroup;
  otp = '';
  showOtpComponent: Boolean = false;
  data!: any;
  showLoading: Boolean = false;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  hideComponent(event: Boolean) {
    this.showOtpComponent = event;
  }
  hideLoading(event: Boolean) {
    this.showLoading = event;
  }

  constructor(
    private formBuilder: FormBuilder,
    private signupService: CommonService,
    private router: Router
  ) {}
  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            // Validators.minLength(8),
            this.passwordStrengthValidator,
          ],
        ],
        confirmPassword: ['', [Validators.required, this.matchPasswords]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.matchPasswords }
    );
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  passwordStrengthValidator(control: FormControl) {
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasDigit = /\d/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

    if (
      control.value.length < 8 ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasDigit ||
      !hasSpecialChar
    ) {
      return { passwordStrength: true };
    }

    return null;
  }

  matchPasswords(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatchedPasswords: true });
      return { mismatchedPasswords: true };
    }

    return null;
  }

  onSubmit() {
    this.showLoading = true;
    this.signupService.apiCall(this.signupForm.value).subscribe((res) => {
      this.otp = res.otp;
      if (this.otp) {
        this.showOtpComponent = true;

        this.data = this.signupForm.value;
      } else {
        this.alreadyExist = res.message;
        setTimeout(() => {
          this.alreadyExist = '';
        }, 4000);
      }
    });
    this.alreadyExist = '';

  }
}
