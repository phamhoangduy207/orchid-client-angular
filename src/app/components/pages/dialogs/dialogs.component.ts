import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DefaultEditor } from 'ng2-smart-table';
import { CkeditorComponent } from '../ckeditor/ckeditor.component';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent extends DefaultEditor  implements OnInit {

  constructor(private dialogService: NbDialogService ) {
    super();
   }

  ngOnInit(): void {
  }

  openDialog(){
    console.log('abc');
    this.dialogService.open(CkeditorComponent);

  }
}
