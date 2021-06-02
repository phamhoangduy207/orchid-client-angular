import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {

  src: LocalDataSource = new LocalDataSource();
  listFeeds: feed[] = [];
  counter: number = 0;

  loading = false;

  constructor(
    private service: FeedService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.refreshList();
    //spinner
    this.loading = true;
    setTimeout(() => (this.loading = false), 400);
  }
  refreshList() {
    this.service.getAllFeeds().subscribe({
      next: (data) => {
        this.listFeeds = data as unknown as feed[];
        this.counter = this.listFeeds.length;
        this.src.load(this.listFeeds);
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
    noDataMessage: 'Loading data...',
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
      image_url: {
        title: 'Photo',
        type: 'html',
        //renderComponent: RenderComponent,
        valuePrepareFunction: (cell?: any) => {
          return `<img src = "${cell}" width = "120px" height ="120px" />`;
        },
        editor: {
          type: 'custom',
          component: UploadComponent,
        },
        sort: false,
        filter: false
      },
      title: {
        title: 'Title',
        type: 'string',
        width: '30%',
        
      },
      content: {
        title: 'Content',
        type: 'string',
        width: '50%',
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
        .delete(this.service.baseURL + '/feeds/' + event.data.feed_id, {
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
      title: event.newData.title,
      image_url: event.newData.image_url,
      content: event.newData.content,
    };
    if (data.title === '') {
      this.toastr.warning('Title can not be blank!', 'Warning');
    } else if (data.image_url === '') {
      this.toastr.warning('Please pick a photo!', 'Warning');
    } else if (data.content === '') {
      this.toastr.warning('Please write some content!', 'Warning');
    } else {
      console.log(data);
      const headers = new HttpHeaders().set(
        'Content-Type', 'application/json'
      );
      this.http
        .post(this.service.baseURL + '/feeds', JSON.stringify(data), {
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
      title: event.newData.title,
      image_url: event.newData.image_url,
      content: event.newData.content,
      feed_id: event.newData.feed_id
    };

    const headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );
    console.log(event.newData);
    this.http
      .put(
        `${this.service.baseURL + '/feeds'}/${event.newData.feed_id}`, JSON.stringify(data), {headers, responseType: 'text',}
      )
      .subscribe(
        (res) => {
          console.log(res);
          event.confirm.resolve(event.newData);
          this.refreshList();
          this.toastr.success('Feed Edited');
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
