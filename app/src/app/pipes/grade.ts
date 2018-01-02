import { Pipe } from '@angular/core';

@Pipe({
    name : 'grade'
})

export class Grade{
    transform (value, args){
        return value;
    }
}