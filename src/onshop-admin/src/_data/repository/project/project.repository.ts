import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProjectResponse} from './model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectRepository extends BaseRepository {
  authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJZT1VSX0lTU1VFUl9DTEFJTSIsImF1ZCI6IlRIRV9BVURJRU5DRSIsImlhdCI6MTU4NDU0MDU5MCwibmJmIjoxNTg0NTQwNTkwLCJleHAiOjE1ODQ3MjA1OTAsImRhdGEiOnsidXNlcl9pZCI6MTYsImVtYWlsIjoiYW5ndWxhckB1a3IubmV0In19.ifDL-xhJF0LeVz2PBGfmXIi-dOeXZ1Ux1rPn_VYdMc8';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getOrders(): Observable<Array<ProjectResponse>> {
    // if (userToken.token) {
    //   let headers = new HttpHeaders();
    //   headers = headers.append('Authorization', `Bearer ${userToken.token}`);
    //   // headers = headers.append('Access-Control-Allow-Origin', '*');
    //   authReq = req.clone({headers});
    // }
    return this.httpClient
      .get<Array<any>>(`${this.apiBaseUrl}/wp-json/onshop/v1/project`, {
        headers: {
          Authorization: 'Bearer ' + this.authToken
        }
      })
      .pipe(map(dtos => {
        const result = [];
        for (const item of dtos) {
          const entity = new ProjectResponse();
          entity.mapFromDto(item);
          result.push(entity);
        }
        return result;
      }));
  }
}
