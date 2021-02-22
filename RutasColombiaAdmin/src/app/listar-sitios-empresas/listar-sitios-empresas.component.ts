import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SitiosEmpresasService } from 'app/services/sitios-empresas.service';
import { environment } from 'environments/environment';

export interface CateroriaElement {
  id: string;
  nombre: string;
  descripcion: string;  
}
@Component({
  selector: 'app-listar-sitios-empresas',
  templateUrl: './listar-sitios-empresas.component.html',
  styleUrls: ['./listar-sitios-empresas.component.css']
})
export class ListarSitiosEmpresasComponent implements OnInit {
  public displayedColumns: string[] = ['nombre','descripcion', "editar"];
  public dataSource: MatTableDataSource<CateroriaElement>;
  public error = "";
  public cargando = false;
  public empresas = [];
  public listaEmpresas: CateroriaElement[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private sitiosEmpresasService: SitiosEmpresasService) {
    this.listarEmpresas();
  }

  ngOnInit() {
  }

  listarEmpresas() {
    console.log("listarEmpresas")
    this.error = "";
    this.cargando = true;
    this.sitiosEmpresasService.listarSitiosEmpresas()
      .subscribe(
        data => {          
          this.empresas = JSON.parse(JSON.stringify(data));
          this.empresas.forEach(empresa => {            
            let imagenUrl = environment.baseUrl + empresa.urlImagen
            this.listaEmpresas.push({ 'id': empresa.id,'nombre': empresa.nombre,'descripcion': empresa.descripcion })
          });
          this.dataSource = new MatTableDataSource(this.listaEmpresas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this.error = error;
        });
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public editarSitio(row) {
    console.log("getRecord", row)
  }

}
