import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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

  hideComponent(event: Boolean) {
    this.showOtpComponent = event;
  }

  constructor(
    private formBuilder: FormBuilder,
    private signupService: UserService,
    private router: Router
  ) {}
  mattta: any = '';
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
    console.log('btn clicked');
    this.signupService.apiCall(this.signupForm.value).subscribe((res) => {
      console.log('iam here', res);
      this.otp = res.otp;
      if (this.otp) {
        this.showOtpComponent = true;
        this.data = this.signupForm.value;
      } else {
        this.alreadyExist = res.message;
        setTimeout(() => {
          this.alreadyExist=''
        }, 4000);
      }
    });
    this.alreadyExist = '';

    console.log('Form submitted!', this.signupForm.value);
  }
}
