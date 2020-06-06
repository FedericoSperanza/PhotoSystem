import { Component, OnInit } from '@angular/core';
import {PhotoService} from './photo.service';
import * as _ from "underscore";
@Component({
  selector: 'app-PhotoGrid',
  templateUrl: './PhotoGrid.component.html',
  styleUrls: ['./PhotoGrid.component.css']
})
export class PhotoGridComponent implements OnInit {
  AllPhotos = [];
  showSpinner: boolean;
  showModal: boolean;
  previewImgSrc;
  currentIndex;
  spinnerVariable: boolean;
  currentPhotoDetails = {
    author: "",
    camera: "",
    tags: ""
  };
  constructor(private photoService : PhotoService) { }

  async ngOnInit() {
    this.showSpinner = true
    let flatPhotos = await this.photoService.getAllPhotos();
    this.AllPhotos = _.flatten(flatPhotos);
    this.showSpinner = false;
    console.log("Todas las fotos", this.AllPhotos)
   }

   async showImage(srcimg,i){
    let photoDetails = await this.getDetails(srcimg.id);
    console.log("photodetails: ", photoDetails)
    this.currentPhotoDetails = photoDetails;
    this.showModal = true;
    this.previewImgSrc = srcimg.cropped_picture;
    this.currentIndex = i;
    console.log("index",i)
  
    }
  
    async getDetails(id){
  
  return await this.photoService.getPhotoDetails(id);
    }
  
    hideImage(){
    this.showModal = false;
    this.previewImgSrc = "";
    }
  
    async changeImage(type){
      this.spinnerVariable=true;
      let imgtoChange;
      if (type === 1){
      if (this.AllPhotos[this.currentIndex + 1] === undefined){
        return
      }
      imgtoChange = this.AllPhotos[this.currentIndex + 1];
      let details = await this.getDetails(imgtoChange.id);
      this.currentPhotoDetails = details;
      this.currentIndex++;
      }else{
        if (this.AllPhotos[this.currentIndex - 1] === undefined){
          return
        }
      imgtoChange = this.AllPhotos[this.currentIndex - 1];
      let details = await this.getDetails(imgtoChange.id);
      this.currentPhotoDetails = details;
      this.currentIndex--;
      }
      this.previewImgSrc = imgtoChange.cropped_picture;
      this.spinnerVariable=false;
    }
  
  

}
