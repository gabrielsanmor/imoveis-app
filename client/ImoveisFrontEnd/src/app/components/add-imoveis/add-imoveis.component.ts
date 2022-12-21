import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-imoveis',
  templateUrl: './add-imoveis.component.html',
  styleUrls: ['./add-imoveis.component.css']
})
export class AddImoveisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images:File[] = []

  onFileSelected(event:any) {
    let fileList: FileList = event.target.files;
    console.log(event.target.files)
    for(var i=0;i<fileList.length;i++){
        let file: File = fileList[i];
        this.images.push(file)
    }
  }

}
