import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { technical } from 'src/app/models/technical';

@Component({
  selector: 'app-technical-list',
  templateUrl: './technical-list.component.html',
  styleUrls: ['./technical-list.component.css']
})
export class TechnicalListComponent implements OnInit {

  ELEMENT_DATA: technical[]=[
    {
      id: 1,
      name: 'Juan Perez',
      document: '12345678910',
      email: 'juanperez@mail.com',
      password: 'XXXXXX',
      profiles:['admin'],
      creationDate:'24/05/2023',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'document', 'email', 'actions'];
  dataSource = new MatTableDataSource<technical>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

