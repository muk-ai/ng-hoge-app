import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  ngOnInit() {
    this.afAuth.idToken.pipe(first()).subscribe(idToken => {
      if (idToken) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        });
        const url = `${environment.apiHost}/tasks`;
        this.tasks$ = this.http.get<Task[]>(url, { headers: headers });
      }
    });
  }

  onSubmit() {
    this.afAuth.idToken.pipe(first()).subscribe(idToken => {
      if (idToken) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        });
        const url = `${environment.apiHost}/tasks`;
        this.http
          .post<Task>(url, this.newTaskForm.value, { headers: headers })
          .subscribe();
      }
    });
  }
}
