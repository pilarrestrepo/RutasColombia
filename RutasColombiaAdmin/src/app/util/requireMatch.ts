import { AbstractControl } from '@angular/forms';

export function RequireMatch(control: AbstractControl) {    
    console.log("RequireMatch",control.value)
    const selection: any = control.value;
    if (typeof selection === 'string') {
        console.log("RequireMatch entreee")
        return { incorrect: true };
    }
    return null;
}