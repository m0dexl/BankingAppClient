import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/core/models/customer.model';
import { RegisterRequest } from 'src/core/models/request/register-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { Transaction } from 'src/core/models/transaction.model';
import { User } from 'src/core/models/user.model';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService
  ) {}

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
    this.getTotalBalance();
    this.getAllUsers();
    this.getAllAccounts();
    this.getAllTx();
  }

  currentUser: User = <User>{};

  newUserObject: RegisterRequest = <RegisterRequest>{};

  isCreateUserPopupVisible: boolean = false;
  toggleCreateUserPopUp() {
    this.isCreateUserPopupVisible = !this.isCreateUserPopupVisible;
  }
  async createUser() {
    this.newUserObject.userType = 2;
    let status = await this.authService.createNewUser(this.newUserObject);
    if (status == ResponseStatus.Ok) {
      console.log('basarili');
      this.refresh();
    }
  }

  async logOut() {
    sessionStorage.clear();
    await this.router.navigate(['../home']);
  }

  getCurrentUser() {
    const userJson = sessionStorage.getItem('current_user');
    this.currentUser = userJson !== null ? JSON.parse(userJson) : new User();
  }

  allCustomers: Customer[] = [];
  currentCustomer: Customer = <Customer>{};

  totalBalance: number = 0;

  allUsers: User[] = [];
  getAllUsers() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.allUsers = response.data;
    });
  }

  getTotalBalance() {
    this.apiService.getAllEntities(Customer).subscribe((response) => {
      this.allCustomers = response.data;
      for (let val of this.allCustomers) {
        this.totalBalance += val.balance;
      }
    });
  }

  allAccounts: Customer[] = [];
  getAllAccounts() {
    this.apiService.getAllEntities(Customer).subscribe((response) => {
      this.allAccounts = response.data;
    });
  }

  allTx: Transaction[] = [];
  getAllTx() {
    this.apiService.getAllEntities(Transaction).subscribe((response) => {
      this.allTx = response.data;
    });
  }

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

  updatedUsersId: number = 0;
  toggleUpdateUser(id: number, updatingUser: User) {
    this.userToUpdate = updatingUser;
    this.isUserUpdating = !this.isUserUpdating;
    this.updatedUsersId = id;
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

  deleteUser(id: number) {
    this.apiService.deleteEntity(id, User);
    alert('Kullanıcı silindi! Sayfayı yenileyiniz');
    this.refresh();
  }
}
