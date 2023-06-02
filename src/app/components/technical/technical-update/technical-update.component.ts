import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Technical } from 'src/app/models/technical';
import { TechnicalService } from 'src/app/services/technical.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-technical-update',
  templateUrl: './technical-update.component.html',
  styleUrls: ['./technical-update.component.css']
})
export class TechnicalUpdateComponent implements OnInit {

  technical: Technical = {
    id: '',
    name: '',
    email: '',
    password: '',
    document: '',
    creationDate: '',
    profiles: []
  }



  name: FormControl = new FormControl(null, Validators.minLength(3));
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(6));
  document: FormControl = new FormControl(null, Validators.required);

  constructor(private service: TechnicalService, private toastr: ToastrService,
     private router: Router, private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.technical.id = this.activatedRoute.snapshot.paramMap.get('id');
    this,this.findById();
  }

  findById(): void{
    this.service.findById(this.technical.id).subscribe(response =>{
      response.profiles = [ ]
      this.technical = response;
    })
  }

  
  update(): void {
    if (this.technical.profiles.length === 0) {
      this.toastr.warning('Escolha pelo menos um perfil', 'Aviso');
      return; 
    }
  
    this.technical.creationDate = moment().format('DD/MM/YYYY');
  
    this.service.update(this.technical).subscribe(
      () => {
        this.toastr.success('Técnico atualizado com sucesso', 'Atualização');
        this.router.navigate(['/technicals']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    );
  }
  

  addProfile(profile: any): void {

    
    if(this.technical.profiles.includes(profile)) {
      this.technical.profiles.splice(this.technical.profiles.indexOf(profile), 1);
    } else {
      this.technical.profiles.push(profile);
    }
    
  }

  validateFields(): boolean {
    return this.email.valid && this.password.valid && this.document.valid && this.name.valid;
  }

}
