import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  public myform: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear Solid', Validators.required],
      ['The Legend of Zelda', Validators.required],
      ['Final Fantasy', Validators.required]
    ])
  })


  public get favoriteGames(): FormArray {
    return this.myform.get('favoriteGames') as FormArray
  }


  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.myform.invalid) {
      // return this.myform.markAllAsTouched()
    }

    console.log(this.myform.value)

    this.myform.reset()
  }
}
