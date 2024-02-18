import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const formValue = {
  name: 'CORSAIR iCUE Link H150i',
  price: 6068,
  inStorage: 10
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {
  // public myFormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], [])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(0)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []]
  })

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
      && this.myForm.controls[field].invalid;
  }

  getFieldError(field: string): string | null {
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.myForm.setValue(formValue);
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      return
    }
    console.log(this.myForm.value);
  }

  onReset(): void {
    this.myForm.reset({ name: '', price: 0, inStorage: 0 });
  }
}
