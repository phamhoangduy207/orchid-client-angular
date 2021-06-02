import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { orchid } from '../models/orchid';

@Injectable({
  providedIn: 'root',
})
export class OrchidService {
  //baseURL = 'https://orchid-server.herokuapp.com/api';
baseURL = 'http://localhost:8080/api'
  constructor(private http: HttpClient) {}

  orchid: orchid = new orchid();

  getAllOrchids() {
    return this.http.get<orchid[]>(this.baseURL + '/orchids');
  }

  addOrchid(){
    return this.http.post(this.baseURL + "/orchids", this.orchid);
  }

  updateOrchid(){
    return this.http.put(`${this.baseURL + "/orchids"}/${this.orchid.orchid_id}`, this.orchid);
  }

  deleteOrchid(id:string){
    return this.http.delete(`${this.baseURL + "/orchids"}/${id}`);
  }

  // ADD, POST METHOD
  /* addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(
      (data) => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          8000
        );
      }
    );
  }

  // UPDATE, PUT METHOD
  updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(
      (data) => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          8000
        );
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(
      (data) => {
        console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster(
          'Error occurred. Details: ' + err.name + ' ' + err.message,
          8000
        );
      }
    );
  } */
}
