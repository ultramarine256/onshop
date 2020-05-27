import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectResponse } from './model';
import { BaseRepository } from '../base.repository';

@Injectable()
export class ProjectRepository extends BaseRepository {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getProjects(): Observable<ProjectResponse[]> {
    return this.httpClient.get<Array<any>>(`${this.apiBaseUrl}/wp-json/onshop/v1/project`).pipe(
      map((dtos) => {
        return dtos.map((dto) => {
          const entity = new ProjectResponse();
          entity.mapFromDto(dto);
          console.log(entity);
          return entity;
        });
      })
    );
  }
}
