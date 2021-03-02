import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.idToken.subscribe(idToken => {
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
}
