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
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss'],
})
export class RootPageComponent implements OnInit {
  tasks$: Observable<Task[]> | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url = `${environment.apiHost}/tasks`;
    this.tasks$ = this.http.get<Task[]>(url);
  }
}
