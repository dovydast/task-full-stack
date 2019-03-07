import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from './interfaces/user.interface';

@Injectable()
export class BackendService{
   /*  apiUrl = "http://localhost:3000/api/users" */              // Use this url for localhosting API
   /*  apiUrl =  https://jsonplaceholder.typicode.com/users */    // Use this url for reiciving random users
      apiUrl = "https://angular-crud-for-hostinger.herokuapp.com/api/users"
    constructor(private http:HttpClient)
    {
    }
        getUsers():Observable<user[]>{
        console.log('Users received')
        return this.http.get<user[]>(this.apiUrl);
        }

        getUserById(id: number):Observable<user[]> {
        console.log('---- User received by id ----')
        return this.http.get<user[]>(this.apiUrl + '/' + id);
        }

        deleteUser(id:number):Observable<user[]>{
        console.log('User deleted ----- ' + this.apiUrl + '/' + id);        
        return this.http.delete<user[]>(this.apiUrl + '/' + id)
        }

        createUser(us:user):Observable<user[]>{
        console.log('User created -----' + this.apiUrl);    
        return this.http.post<user[]>(this.apiUrl, us)
        }

        updateUser(us){
        console.log('User Updated ----- -', this.apiUrl + '/' + us.id)
        return this.http.put(this.apiUrl + '/' + us.id, us)
        }
 }

   

