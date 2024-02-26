import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.requiredTrue],
    termsAndConditions: [true, Validators.requiredTrue]
  })

  public person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset({ ...this.person, termsAndConditions: false });
  }

  public isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
      && this.myForm.controls[field].invalid;
  }

  public getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    const message = Object.keys(errors)[0];

    console.log({ message })

    switch (message) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `This field must have at least ${errors[message].requiredLength} characters`;
      case 'min':
        return 'This field must be greater than 0';
      default:
        return null;
    }
  }

  public onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    console.log(this.myForm.value);

  }
}
