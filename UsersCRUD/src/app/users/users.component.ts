import { Component, OnInit, OnChanges, enableProdMode } from '@angular/core';
import { BackendService } from "../shared/backend.service";
import { user } from "../shared/interfaces/user.interface";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit{

  public data: user[];
  constructor(public service: BackendService, private router: Router,  private toaster :ToastrService) {}

  ngOnInit() {
   this.displayUsers();
  }

  displayUsers() {
    this.service.getUsers().subscribe(userResult => {
      this.data = userResult;
    });
  }

  editUser(id){
    this.router.navigate(['/user-edit'+ '/' + id])
  }

  removeUser(id: number, i: number) {
    if (confirm("Are you sure to delete this user?")) {
      this.service.deleteUser(id).subscribe(result => {
        this.data.splice(i, 1);
        this.router.navigate(["/"]);
        this.toaster.success('User was deleted', 'Success !');
      });
    }
  }
}

