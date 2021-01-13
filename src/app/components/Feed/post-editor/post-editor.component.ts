import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Quill from 'quill';
import { QuillConfiguration } from "./quill-configuration";
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl

  constructor(
    public backService: BackendService
  ) { }


  ngOnInit(): void {
    this.control = this.control ?? new FormControl()
  }

  printValue(): void {
    let data = {
      postedAt : "2021-01-13T13:49:49.472Z",
      author : "Florent Ricciardi",
      content : this.control.value
    }
    this.backService.createPost(data).subscribe((response) =>{
      console.log(response)
    })
    console.log(this.control.value)
  }

}
