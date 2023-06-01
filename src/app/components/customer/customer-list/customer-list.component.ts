import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  ELEMENT_DATA: Customer[]=[ ]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: CustomerService) { }

  ngOnInit(): void {
    this.findAll();
  
  }

  displayedColumns: string[] = ['position', 'name', 'document', 'email', 'actions'];
  dataSource = new MatTableDataSource<Customer>(this.ELEMENT_DATA);


  findAll(){
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Customer>(response);
      this.dataSource.paginator = this.paginator;
    
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

