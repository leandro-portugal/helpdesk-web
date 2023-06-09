import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket';
import { TicketsService } from 'src/app/services/tickets.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  ELEMENT_DATA: Ticket[]=[]
  FILTERED_DATA: Ticket[]=[]

  displayedColumns: string[] = ['position', 'title', 'customerName', 'technicalName', 'priority','status', 'lastUpdate','actions'];
  dataSource = new MatTableDataSource<Ticket>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private service: TicketsService) { }

  ngOnInit(): void {
    this.findAll();
  }

  
  findAll(): void{
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Ticket>(response);
      this.dataSource.paginator = this.paginator;});
  }

  
  getPriorityStyle(priority: string) {
    if (priority === 'Baixa') {
      return {
        'color': 'rgb(46, 125, 50)',
        'font-weight': 'bold'
      };
    }
    else if(priority === 'Média'){
      return{
        'color': 'rgb(249, 168, 37)',
        'font-weight': 'bold'
      };

    }
    else{
      return{
        'color': 'rgb(198, 40, 40)',
        'font-weight': 'bold'
      }
    }
  }


  getStatusStyle(status: string) {
    if (status === 'Aberto') {
      return {
        'color': 'rgb(46, 125, 50)',
        'font-weight': 'bold'
      };
    }
    else if(status === 'Em andamento'){
      return{
        'color': 'rgb(21, 101, 192)',
        'font-weight': 'bold'
      };

    }
    else{
      return{
        'color': 'rgb(198, 40, 40)',
        'font-weight': 'bold'
      }
    }
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  orderByStatus(status: any): void{
    let list: Ticket[] = []
    this.ELEMENT_DATA.forEach(element =>{
      if(element.status === status){
        list.push(element)
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Ticket>(list);
    this.dataSource.paginator = this.paginator;
  }

  
  orderByPriority(priority: any): void{
    let list: Ticket[] = []
    this.ELEMENT_DATA.forEach(element =>{
      if(element.priority === priority){
        list.push(element)
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Ticket>(list);
    this.dataSource.paginator = this.paginator;
  }
  clearFilters(): void {
    
    this.findAll();
  }
  
}
