import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  tasks$: Observable<Task[]> | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = `${environment.apiHost}/tasks`;
    this.tasks$ = this.http.get<Task[]>(url);
  }
}
