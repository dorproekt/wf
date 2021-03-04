import {makeAutoObservable} from "mobx";

export default class UserStore{

  constructor() {
    this._isAuth = false

    makeAutoObservable(this)
  }

  get isAuth(){
    return this._isAuth
  }

  setIsAuth(value){
    this._isAuth = value
  }

}