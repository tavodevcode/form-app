import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear Solid', Validators.required],
      ['The Legend of Zelda', Validators.required],
      ['Final Fantasy', Validators.required]
    ])
  })

  public newFavoriteGame: FormControl = this.fb.control('', Validators.required)

  public get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray
  }

  constructor(private fb: FormBuilder) { }

  public isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
      && this.myForm.controls[field].invalid;
  }

  public isValidFieldArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
      && formArray.controls[index].invalid;
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

  public getFieldErrorArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors || {};

    const message = Object.keys(errors)[0];

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

  public onDeleteFieldArray(index: number): void {
    this.favoriteGames.removeAt(index)
  }

  public onAddFavoriteGame(): void {
    if (this.newFavoriteGame.invalid) return

    this.favoriteGames.push(this.fb.control(this.newFavoriteGame.value, Validators.required))

    this.newFavoriteGame.reset('')
  }

  public onSubmit(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])

    this.myForm.reset();
  }
}
