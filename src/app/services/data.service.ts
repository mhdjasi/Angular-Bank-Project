import { transition } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //Login username
  currentUsername: any

  //Login Acno
  currentAcno: any
  // data base
  userDetails: any = {
    1000: { acno: 1000, username: 'Neer', password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, username: 'Laisha', password: 1001, balance: 6000, transaction: [] },
    1002: { acno: 1002, username: 'Vyom', password: 1002, balance: 4000, transaction: [] }
  }


  constructor() { 
    this.getDetails()
  }


  //to store data in local storage
  saveDetails() {
    //database
    if (this.userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(this.userDetails))
    }
    //login acno
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno))
    }
    //login username
    if (this.currentUsername) {
      localStorage.setItem('currentUsername', JSON.stringify(this.currentUsername))
    }
  }

  // to get data from local storage
  getDetails(){
    //database
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '')
    }
    //login acno
    if(localStorage.getItem('currentAcno')){
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')
    }
    //login username
    if(localStorage.getItem('currentUsername')){
      this.currentUsername = JSON.parse(localStorage.getItem('currentUsername') || '')
    }
    
  }

  //register

  register(acno: any, password: any, username: any) {
    let userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = {
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      }
      // console.log(userDetails);
      //function call of local storage
      this.saveDetails()
      return true

    }
  }

  //login()
  login(acno: any, pswd: any) {

    let userDetails = this.userDetails

    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        this.currentUsername = userDetails[acno]['username']
        this.currentAcno = acno
        //function call of local storage
        this.saveDetails()
        return true
      }
      else {
        alert('incorrect password')
        return false
      }

    }
    else {
      alert('User doesnot exist')
      return false
    }
  }

  //deposit
  deposit(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amount
        userDetails[acno]['transaction'].push({
          type: 'CREDIT',
          amount
        })
        console.log(userDetails);
        //function call of local storage
        this.saveDetails()
        return userDetails[acno]['balance']

      }
      else {
        alert('Incorrect password')
        return false
      }
    }
    else {
      alert('User doesnot Exist')
      return false
    }
  }

  //withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    let userDetails = this.userDetails
    var amount = parseInt(amt)
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        if (userDetails[acno]['balance'] > amount) {
          userDetails[acno]['balance'] -= amount
          userDetails[acno]['transaction'].push({
            type: 'DEBIT',
            amount
          })
          console.log(userDetails);
          //function call of local storage
          this.saveDetails()
          return userDetails[acno]['balance']
        }
        else {
          alert('Insufficient Blalance')
          return false
        }

      }
      else {
        alert('Incorrect password')
        return false
      }
    }
    else {
      alert('User doesnot Exist')
      return false
    }

  }


  //transaction 
  getTransaction(acno: any) {
    return this.userDetails[acno]['transaction']
  }

}
