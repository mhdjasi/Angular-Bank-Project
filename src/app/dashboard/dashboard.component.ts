import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno = ""
  // pswd = ""
  // amount = ""

  // acno1 = ""
  // pswd1 = ""
  // amount1 = ""

  //login Username
  user = ""

  //deposit - model
  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  //withdraw - model
  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],

  })

  //acno to child
  acno:any

  //to hold date
  lDate:any





  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    //fetch username from local storage
    this.user = JSON.parse(localStorage.getItem('currentUsername') || '')
    this.lDate= new Date()
  }

  ngOnInit(): void {
    // if(!localStorage.getItem('currentAcno')){
    //   alert('please login')
    //   this.router.navigateByUrl('')
    // }
  }

  deposit() {
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      this.ds.deposit(acno, pswd, amount)
      .subscribe(
        //200
        (result:any)=>{
        alert(result.message)
      },
      //400
      result=>{
        alert(result.error.message)
      }
      )

    }
    else {
      alert('Invaild Deposit Form')
    }


  }

  withdraw() {

    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1

    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, pswd, amount)

      .subscribe(
        //200
        (result:any)=>{
        alert(result.message)
      },
      //400
      result=>{
        alert(result.error.message)
      }
      )

    }
    else {
      alert('Invaild Withdraw Form')
    }

  }

  //logout 
  logout(){
    //remove login acno from local storage
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    //redirect into login page
    this.router.navigateByUrl('')
  }

  //deleteParent
  deleteParent(){
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
  }

  //cancel() - to set acno as empty
  cancel(){
    this.acno=""
  }

  //onDelete($event)
  onDelete(event:any){

    //asynchronous 
    this.ds.delete(event)
    .subscribe(
      (result:any)=>{
        alert(result.message)
        //redirect into login page
    this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message)
      }
    )
    
  }

}
