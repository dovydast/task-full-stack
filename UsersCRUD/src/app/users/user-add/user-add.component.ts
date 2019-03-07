import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { user } from '../../shared/interfaces/user.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private service: BackendService, private toaster: ToastrService ) {}

  user:user;
  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  } 

  onSubmit() {
    if (this.addForm.invalid) {
      return this.toaster.warning('Correct input fields first', 'Warning!'); ;
       }
          this.service.createUser(this.addForm.value).subscribe( data => {
          this.router.navigate(['/'])
          }); 
          this.toaster.success('User created', 'Success :)');
          }
    
}


