import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // properties / variable

    //login - model
    loginForm = this.fb.group({
      acno: ['',[Validators.required, Validators.pattern('[0-9]*')]],
      pswd: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  

  
aim = 'your perfect banking partner'

account = 'enter account number here'

//to hold user account number
acno =""
//to hold user password
pswd =""

  // data base
userDetails:any = {
  1000:{acno:1000,username:'Neer',password:1000,balance:5000},
  1001:{acno:1001,username:'Laisha',password:1001,balance:6000},
  1002:{acno:1002,username:'Vyom',password:1002,balance:4000}
}
  //constructor - first run in class (Dependency Injection )
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  //life cycle hook - angular
  ngOnInit(): void {
  }


  //user defined function

//acno change

  // acnoChange(event:any){
  // this.acno =  event.target.value
  // console.log(this.acno);

  // }

  // //password change
  
  // pswdChange(event:any){
  //   this.pswd =  event.target.value
  //   console.log(this.pswd);
  
  //   }


//login()
  login(){
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd

    if(this.loginForm.valid){
//calling login - dataService - asynchronous
this.ds.login(acno,pswd)
.subscribe(
  (result:any)=>{
    localStorage.setItem('currentUsername', JSON.stringify(result.currentUsername))
    localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
    localStorage.setItem('token', JSON.stringify(result.token))

  alert(result.message)
  this.router.navigateByUrl("dashboard")
},
result=>{
  alert(result.error.message)
}
)

    }
    else{
      alert('Invaild Login Form')
    }
    }   
  }



  // login(a:any,p:any){
  //   console.log(a);
    
  //   var acno = a.value
  //   var pswd = p.value

  //   let userDetails = this.userDetails

  //   if(acno in userDetails){
  //     if(pswd == userDetails[acno]['password']){
  //       alert('login succesfully')
  //     }
  //     else{
  //       alert('incorrect password')
  //     }

  //   }
  //   else{
  //     alert('User doesnot exist')
  //   }
  // }

