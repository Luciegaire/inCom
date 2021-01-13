import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Quill from 'quill';
import { QuillConfiguration } from "./quill-configuration";


@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  quillConfiguration = QuillConfiguration;
  @Input() control: FormControl

  constructor() { }


  ngOnInit(): void {
    this.control = this.control ?? new FormControl()
  }

  printValue(): void {
    console.log(this.control.value)
  }

}
