import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
//import { SearchService } from '@app/services/search.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ResolverService{

  constructor() { }
}
