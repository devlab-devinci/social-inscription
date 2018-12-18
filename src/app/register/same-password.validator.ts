import { ValidatorFn, AbstractControl } from "@angular/forms";

/** A password match checker */
export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if(control.parent == undefined) return null;
        return control.value !== control.parent.get('password').value ? {'passwordMatch': {value: control.value}} : null;
      };
  }