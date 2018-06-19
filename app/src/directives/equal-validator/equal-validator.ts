import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
/**
 * Generated class for the EqualValidatorDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[validateEqual][formControlName], [validateEqual][formControl], [validateEqual][ngModel]', // Attribute selector
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
  ]
})
export class EqualValidatorDirective implements Validator {

  constructor( @Attribute('validateEqual') public validateEqual: string) {}

  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. confirm password)
    let cnfrm = c.value;
    
    // control value (e.g. password)
    let pswd = c.root.get(this.validateEqual);

    // value not equal
    if (pswd && cnfrm !== pswd.value) return {
      validateEqual: false
    }
    return null;
  }
}
