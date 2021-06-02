import { Component, Input, OnInit } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends DefaultEditor implements OnInit {
  constructor(private storage: AngularFireStorage) {
    super();
  }

  ngOnInit(): void {}

  filePath: string[] = [];
  fileName: string[] = [];
  selectFiles(event) {
    /* for (var i = 0; i < event.target.files.length; i++) { 
      this.cell.newValue += `${event.target.files[i].name},`;
    }
    this.cell.newValue = this.cell.newValue.slice(0, -1);
    console.log(this.cell.newValue); */
    for (var i = 0; i < event.target.files.length; i++) {
      this.filePath[i] = event.target.files[i];
      this.cell.newValue += `${event.target.files[i].name},`;
    }
    this.cell.newValue = this.cell.newValue.slice(0, -1);
    this.fileName = this.cell.newValue.split(',');
  }
  uploadFiles() {
    for (var i = 0; i < this.filePath.length; i++) {
      //console.log(this.filePath[i]);
      this.storage.upload('/hoalan/' + this.fileName[i], this.filePath[i]);
      window.alert('Uploaded to Firebase');
    }
  }
}

@Component({
  template: `
    <div>
      <img
        [src]="
          domSrv.bypassSecurityTrustUrl(
            'gs://hoalanmanager.appspot.com/hoalan/' + value
          )
        "
        class="rounded mb-3"
        width="120"
        height="120"
      />
    </div>
  `,
})
export class RenderComponent implements ViewCell {
  constructor(public domSrv: DomSanitizer) {}
  @Input() value: string;
  @Input() rowData: any;
}
