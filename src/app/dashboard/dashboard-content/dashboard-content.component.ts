import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/core/models/customer.model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { Transaction } from 'src/core/models/transaction.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],
})
export class DashboardContentComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.refresh();
  }

  status = false;
  addToggle() {
    this.status = !this.status;
  }

  refresh() {
    this.getCurrentUser();
    this.getCustomerAccountDetails(this.currentUser.id);
    this.getCustomersTransaction();
  }

  currentUser: User = <User>{};

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  allCustomers: Customer[] = [];
  currentCustomer: Customer = <Customer>{};

  getCustomerAccountDetails(id: number) {
    this.apiService.getAllEntities(Customer).subscribe((response) => {
      this.allCustomers = response.data;
      for (let val of this.allCustomers) {
        if (val.customerUser_Id == id) {
          this.currentCustomer = val;
          console.log(this.currentCustomer);
        }
      }
    });
  }
  transactionsList: Transaction[] = [];
  currCustomerTxList: Transaction[] = [];

  // getCustomersTransaction(id: number) {
  //   this.apiService.getAllEntities(Transaction).subscribe((response) => {
  //     // this.transactionsList = response.data;
  //     // for (let val of this.transactionsList) {
  //     //   if (val.senderCustomerId == id) {
  //     //     this.currCustomerTxList.push(val);
  //     //   }
  //     // }
  //     for (let val of response.data) {
  //       if (val.senderCustomerId == id) {
  //         this.currCustomerTxList.push(val);
  //       }
  //     }
  //   });
  // }

  getCustomersTransaction() {
    this.apiService.getAllEntities(Transaction).subscribe((response) => {
      this.transactionsList = response.data;
      for (let val of this.transactionsList) {
        if (
          val.senderCustomerId == this.currentCustomer.id &&
          !this.currCustomerTxList.includes(val)
        ) {
          this.currCustomerTxList.push(val);
        }
      }
    });
  }
  userToUpdate: User | null = null;
  isUserUpdating: boolean = false;
  toggleUpdateUser() {
    this.userToUpdate = this.currentUser;
    this.isUserUpdating = !this.isUserUpdating;
  }

  updateUser(id: number, updatedUser: User) {
    this.apiService
      .updateEntity(id, updatedUser, User)
      .then((res) => {
        console.log(res);
        if (res?.status == ResponseStatus.Ok) {
          this.currentUser = updatedUser;
        }
      })
      .catch((err) => {
        console.log('Bilgiler güncellenirken hata oluştur:', err);
      });
    this.isUserUpdating = false;
  }

  isCustomerUpdating: boolean = false;
  toggleUpdateCustomer() {
    this.customerToUpdate = this.currentCustomer;
    this.isCustomerUpdating = !this.isCustomerUpdating;
  }

  customerToUpdate: Customer | null = null;
  updateCustomer(id: number, updatedCustomer: Customer) {
    this.apiService
      .updateEntity(id, updatedCustomer, Customer)
      .then((res) => {
        console.log(res);
        if (res?.status == ResponseStatus.Ok) {
          this.currentCustomer = updatedCustomer;
        }
      })
      .catch((err) => {
        console.log('Bilgiler güncellenirken hata oluştur:', err);
      });
    this.isUserUpdating = false;
  }

  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['../home']);
  }
}
