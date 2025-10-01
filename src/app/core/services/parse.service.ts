import { Injectable } from '@angular/core';
import Parse from 'parse';

@Injectable({
  providedIn: 'root',
})

export class ParseService {
  constructor() {
    const PARSE_APP_ID = "675T25cwRIixahHn0QNJBUyomLARYh8NfGOw8IYn";
    const PARSE_JS_KEY = "jnEKAAE2HuorVbHeuFXBdvZMciYp6iQPrpYY82qU";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
    (Parse as any).serverURL = 'https://parseapi.back4app.com/';
  }
}