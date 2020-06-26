import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectResponse } from './model';
import { BaseRepository } from '../base.repository';

@Injectable({
  providedIn: 'root',
})
export class ProjectRepository extends BaseRepository {
  constructor(private httpClient: HttpClient) {
    super();
  }

  public getProjects(): Observable<ProjectResponse[]> {
    return this.httpClient.get<any[]>(`${this.apiBaseUrl}/wp-json/onshop/v3/project`).pipe(
      map((dtos) => {
        return dtos.map((dto) => {
          const entity = new ProjectResponse();
          entity.mapFromDto(dto);
          return entity;
        });
      })
    );
  }

  public getProject(id: number): Observable<ProjectResponse> {
    return this.httpClient.get<any[]>(`${this.apiBaseUrl}/wp-json/onshop/v3/project/${id}`).pipe(
      map((dto) => {
        const entity = new ProjectResponse();
        entity.mapFromDto(dto);
        return entity;
      })
    );
  }
}
