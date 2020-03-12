import {Injectable} from '@angular/core';
import {BaseRepository} from '../base.repository';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProjectResponse} from './model';

@Injectable()
export class ProjectRepository extends BaseRepository {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getOrders(): Observable<Array<ProjectResponse>> {
    return this.httpClient
      .get<Array<any>>(`${this.apiBaseUrl}/wp-json/onshop/v1/project`)
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
