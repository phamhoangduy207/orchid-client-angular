import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { orchid } from 'src/app/models/orchid';
import { OrchidService } from 'src/app/services/orchid.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-orchid',
  templateUrl: './orchid.component.html',
  styleUrls: ['./orchid.component.scss'],
})
export class OrchidComponent {
  src: LocalDataSource = new LocalDataSource();
  listOrchids: orchid[] = [];
  counter: number = 0;

  loading = false;

  constructor(
    private service: OrchidService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    //spinner
    this.loading = true;
    setTimeout(() => (this.loading = false), 15000);
  }
  refreshList() {
    this.service.getAllOrchids().subscribe({
      next: (data) => {
        this.listOrchids = data as unknown as orchid[];
        this.counter = this.listOrchids.length;
        this.src.load(this.listOrchids);
      },
      error: (err) => {
        console.error('There was an error', err);
      },
    });
    //console.log(this.src);
  }
  showAll() {
    return this.src.reset();
  }
  settings = {
    noDataMessage: '',
    pager: {
      display: true,
      perPage: 6,
    },
    actions: {
      position: 'right',
      width: '5%',
    },
    add: {
      addButtonContent: '<i class="bi bi-plus"></i>',
      createButtonContent: '<i class="bi bi-check-square"></i>',
      cancelButtonContent: '<i class="bi bi-arrow-counterclockwise"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="bi bi-pencil-square"></i>',
      saveButtonContent: '<i class="bi bi-check-square"></i>',
      cancelButtonContent: '<i class="bi bi-arrow-counterclockwise"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="bi bi-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      url_m: {
        title: 'Photo',
        type: 'html',
        //renderComponent: RenderComponent,
        valuePrepareFunction: (cell?: any) => {
          return `<img src = "${cell[0]}" width = "120px" height ="120px" />`;
        },

        editor: {
          type: 'custom',
          component: UploadComponent,
        },
        sort: false,
        filter: false
      },
      name: {
        title: 'Name',
        type: 'string',
        width: '',
      },
      science_name: {
        title: 'Science name',
        type: 'string',
        width: '',
      },
      category: {
        title: 'Category',
        type: 'string',
        width: '',
      },
      location: {
        title: 'Location',
        type: 'string',
        width: '',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
    },
  };
  onDeleteConfirm(event: any): void {
    //console.log(event.data.cat_id);
    if (window.confirm('Are you sure you want to delete this?')) {
      const headers = new HttpHeaders().set(
        'Content-Type',
        'text/plain; charset=utf-8'
      );
      this.http
        .delete(this.service.baseURL + '/orchids/' + event.data.orchid_id, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          (res) => {
            console.log(res);
            event.confirm.resolve(event.source.data);
            this.refreshList();
            this.toastr.success('Deleted successfully!');
          },
          (err) => {
            console.log(err.message);
            if (err.status === 500)
              this.toastr.error(
                'Can not delete this category because it is currently in used',
                'Task failed'
              );
          }
        );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event?: any): void {
    console.log(event.newData);
    var data = {
      name: event.newData.name,
      science_name: event.newData.science_name,
      category: event.newData.category,
      location: event.newData.location,
      description: event.newData.description,
      url_m: event.newData.url_m.split(','),
      humidity: '50-70%',
      intermediate: '10 - 26.7C',
      warm: '',
      note: ''
    };
    if (data.name === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.science_name === '') {
      this.toastr.warning('Please provide author name!', 'Warning');
    } else if (data.category === '') {
      this.toastr.warning('Please pick a published day!', 'Warning');
    } else if (data.location === '') {
      this.toastr.warning('Please fill in a price for the book!', 'Warning');
    } else if (data.description === '') {
      this.toastr.warning('Please pick a cover image!', 'Warning');
    } else {
      console.log(data);
      const headers = new HttpHeaders().set(
        'Content-Type', 'application/json'
      );
      this.http
        .post(this.service.baseURL + '/orchids', JSON.stringify(data), {
          headers,
          responseType: 'text',
        })
        .subscribe(
          (res) => {
            console.log(res);
            event.confirm.resolve(event.newData);
            this.refreshList();
            this.toastr.success('Added successfully!');
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log(err.message);
              this.toastr.error(`Something's wrong! Please try again`);
            } else {
              console.log(err.message);
              this.toastr.error(`Something's wrong! Please try again`);
            }
          }
        );   
    }
  }

  onSaveConfirm(event: any): void {
    var data = {
      name: event.newData.name,
      science_name: event.newData.science_name,
      category: event.newData.category,
      location: event.newData.location,
      description: event.newData.description,
      url_m: event.newData.url_m.split(','),
      humidity: '50-70%',
      intermediate: '10 - 26.7C',
      warm: '',
      note: '',
      orchid_id: event.newData.orchid_id
    };

    const headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );
    console.log(event.newData);
    this.http
      .put(
        `${this.service.baseURL + '/orchids'}/${event.newData.orchid_id}`, JSON.stringify(data), {headers, responseType: 'text',}
      )
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('Orchid Edited');
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(err.message);
          } else {
            console.log(err.message);
          }
        }
      );
  }
}
