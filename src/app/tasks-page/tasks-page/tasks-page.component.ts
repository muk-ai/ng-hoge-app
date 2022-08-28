import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UntypedFormBuilder, Validators } from '@angular/forms';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent implements OnInit {
  tasks$: Observable<Task[]> | null = null;
  newTaskForm = this.fb.group({
    description: ['', Validators.required],
  });

  constructor(private http: HttpClient, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    const url = `${environment.apiHost}/tasks`;
    this.tasks$ = this.http.get<Task[]>(url);
  }

  onSubmit() {
    this.createTask(this.newTaskForm.value);
  }

  createTask(formData: any) {
    const url = `${environment.apiHost}/tasks`;
    this.http.post<Task>(url, formData).subscribe(_task => {
      this.newTaskForm.reset();
      this.fetchTasks();
    });
  }

  deleteTask(id: number) {
    const url = `${environment.apiHost}/tasks/${id}`;
    this.http.delete<Task>(url).subscribe(_response => {
      this.fetchTasks();
    });
  }

  doneTask(id: number) {
    const url = `${environment.apiHost}/tasks/${id}`;
    this.http
      .patch<Task>(url, { completed: true })
      .subscribe(_task => {
        this.fetchTasks();
      });
  }
}
