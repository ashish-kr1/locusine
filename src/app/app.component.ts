import { Component } from '@angular/core';
import { Services } from './service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users = [];
  userForm;
  editMode: boolean = false;
  constructor(private service: Services,
    private toastr: ToastrService,
    public fb: FormBuilder

  ) {
  }
  initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: [''],
      role: ['Admin', [Validators.required]]
    })
  }
  ngOnInit() {
    this.initForm();
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers().subscribe(data => {
      if (data.success) {
        this.users = data.users;
      }
    }, err => {
      console.log(err)
    })
  }
  add() {
    this.initForm();
    this.editMode = false;
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  addUser() {
    if (this.userForm.status === 'VALID') {
      this.service.addUser(this.userForm.value).subscribe(data => {
        if (data.success) {
          this.toastr.success('User Added');
          this.users.push(this.userForm.value);
          this.close();
        }
      })
    } else {
      this.toastr.info('Form is invalid..!');
    }
  }
  edit(u) {
    this.editMode = true;
    this.userForm = this.fb.group({
      name: [u.name, [Validators.required]],
      email: [u.email, [Validators.required]],
      contact: [u.contact],
      role: [u.role, [Validators.required]],
      _id: [u._id]
    })
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  update() {
    if (this.userForm.status === 'VALID') {
      this.service.updateUser(this.userForm.value).subscribe(data => {
        if (data.success) {
          this.getUsers();
          this.toastr.success('User Updated');
          this.close();
        }
      })
    } else {
      this.toastr.info('Form is invalid..!');
    }
  }
  delete(u, index) {
    this.service.deleteUser(u._id).subscribe(data => {
      if (data.success) {
        this.users.splice(index, 1);
        this.toastr.success('User deleted');
      }
    }, err => {
      this.toastr.error('Something Went Wrong...!')
    })
  }
}
