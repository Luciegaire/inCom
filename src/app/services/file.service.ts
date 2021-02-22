import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { exit } from 'process';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  imageDetailList: AngularFireList<any>;

  fileList: any[];

  dataSet: Data = {
    id: '',
    url: ''
  };

  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase, private http: HttpClient, public af: AngularFireDatabase) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  deleteImageDetailList(key) {
    this.imageDetailList.remove(key);
  }

  insertImageDetails(id, url, key) {
    this.dataSet = {
      id: id,
      url: url
    };
    this.imageDetailList.update(key, this.dataSet);
  }

}

export interface Data {
  id: string;
  url: string;
}