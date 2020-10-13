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
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
  constructor(private postsService: PostsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.postsService.getSingleShow(route.paramMap.get('title'));
  }

}
