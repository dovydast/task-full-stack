import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../shared/backend.service';

import { Router } from '@angular/router';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id;
  user = [];

  constructor(private router: Router, private service:BackendService,
  private route:ActivatedRoute, private toaster : ToastrService) {
  route.paramMap.subscribe(params => {this.id = params.get('id')}); }

  ngOnInit() {
    console.log(this.id)
     this.service.getUserById(this.id).subscribe(user => this.user = user);
    

  }
  onSubmit() {
      this.service.updateUser(this.user)
      .subscribe(() => this.router.navigate(['/users']));
      this.toaster.success('User was updated', 'Success!');
  }

}
