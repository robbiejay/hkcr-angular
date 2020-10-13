import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { PostsService } from '../posts.service';
import { HelpersService } from '../helpers.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogGuardService {


    constructor(private router: Router,
                private _meta: Meta,
                private _title: Title,
                private postsService: PostsService,
                private helpersService: HelpersService) { }

                canActivate( route: ActivatedRouteSnapshot,
                             state: RouterStateSnapshot): Observable<boolean> {

                const id = route.paramMap.get('id');
                const title = route.paramMap.get('title');

                return this.postsService.getSinglePost(title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).pipe(
                  map(
                    showData => {

                      let featured_img;
                      if(showData._embedded['wp:featuredmedia'] == undefined) {
                        featured_img = "assets/default_show.png";
                      } else {
                        featured_img = showData._embedded['wp:featuredmedia'][0].source_url;
                      }

                      this._title.setTitle(showData.title.rendered);
                      this._meta.updateTag({ name: 'description', content: showData.excerpt.rendered});
                  //    this._meta.updateTag({ name: 'keywords', content: showData.title + ', mix, ' + JSON.stringify(showData.tags)},"name='keywords'");
                      this._meta.updateTag({ property: 'og:image', content: featured_img});
                      this._meta.updateTag({ property: 'og:title', content: showData.title.rendered});
                      this._meta.updateTag({ property: 'og:description', content: showData.excerpt.rendered});
                           return true;
                    }
                  )
                )

                }
}
