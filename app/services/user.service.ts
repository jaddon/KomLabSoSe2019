import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// imports the user model from models
import { User } from '@/models/user';

/* The user service contains a standard set of CRUD methods
 * for managing users, it acts as the interface between the
 * Angular application and the backend api.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}