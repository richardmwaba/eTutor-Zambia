import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:'category'
})

@Injectable()
export class Category implements PipeTransform{
    transform(items: any[], field: string, value: string): any[]{
        if (!items) return [];
        return items.filter(it => it[field] == value);
    }
}