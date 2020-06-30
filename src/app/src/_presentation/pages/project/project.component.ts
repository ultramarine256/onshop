import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ProjectRepository, ProjectResponse, UserRepository } from '@data/repository';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public projectData$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository
  ) {}

  ngOnInit() {
    this.projectData$ = this.activatedRoute.params.pipe(
      switchMap((params) =>
        forkJoin([
          this.projectRepository.getProject(params.id),
          this.projectRepository
            .getProjectUsersIds(params.id)
            .pipe(
              switchMap((usersIds) =>
                this.userRepository.getUsers().pipe(map((users) => users.filter((user) => usersIds.includes(+user.id))))
              )
            ),
        ]).pipe(
          map((data) => ({
            project: data[0],
            users: data[1],
          })),
          tap((data) => console.log(data))
        )
      )
    );
  }
}
