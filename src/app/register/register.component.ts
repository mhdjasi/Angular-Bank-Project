import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // uname=""
  // acno=""
  // pswd=""

  //register - model
  registerForm = this.fb.group({
    uname: ['',[Validators.required, Validators.pattern('[a-zA-Z]*')]],
    acno: [''],
    pswd: ['']
  })

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    // console.log(this.registerForm);

    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd

    if (this.registerForm.valid) {
      //call register in data service
      const result = this.ds.register(acno, pswd, uname)
      if (result) {
        alert('Successfully register')
        this.router.navigateByUrl("")
      }
      else {
        alert('User already Exist... Please Log In')
        this.router.navigateByUrl("")
      }
    }
    else{
      alert('Invalid Forms')
    }


  }

}
