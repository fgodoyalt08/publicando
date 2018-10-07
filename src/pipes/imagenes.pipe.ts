import { PipeTransform , Pipe } from '@angular/core';
@Pipe( { name : 'keys' } )
export class KeysPipe implements PipeTransform {
    transform ( value , args : string[] ) : any {
    	if(value == undefined) return [];
        return JSON.parse(value);
    }
}