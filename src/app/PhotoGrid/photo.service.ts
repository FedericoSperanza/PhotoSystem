import { Injectable } from '@angular/core';
import * as _ from "underscore";
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  postUrl = "http://interview.agileengine.com/auth";
  getUrl = "http://interview.agileengine.com"
  apiKey = "23567b218376f79d9415";
  token;

constructor() { }

async getPhotoDetails(id){
  let data = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + this.token
    }
  }
  let res = await fetch(this.getUrl+'/images/'+id+'',data)
  .then(res =>{
    return res.json();
  })
  .catch(e => {
    throw(e)
  })
  return res;
}

async getPhotosFetch(page){
  let response = await this.getTokenFetch();
  this.token = response.token;
  let data = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + this.token
    }
  }
  let res = await fetch(this.getUrl+'/images?page='+page+'',data)
  .then(res =>{
    return res.json();
  })
  .catch(e => {
    throw(e)
  })
  return res;
}

async getAllPhotos(){
  let allPhotosUrl = [];
  let resFetch = await this.getPhotosFetch(1);
  console.log("resfetch",resFetch )
  allPhotosUrl.push(resFetch.pictures)
  let totalPages = resFetch.pageCount;
  for (let index = 2; index <= resFetch.pageCount; index++) {
    let resFetch = await this.getPhotosFetch(index);
    allPhotosUrl.push(resFetch.pictures)
  }

  console.log("All Photos ",allPhotosUrl)
  return allPhotosUrl;
}

async getTokenFetch(){
  let data = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey: "23567b218376f79d9415"
    })
  }
 return fetch(this.postUrl,data)
  .then(res =>{
    return res.json();
  })
  .then(resJson =>{
    return resJson
  })
  .catch(e => {
    console.log("#UNAUTHORIZED#")
    throw(e)
  })
}

}


