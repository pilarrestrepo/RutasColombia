import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SitiosService } from 'app/services/sitios.service';
import { MatTableDataSource } from '@angular/material/table';

export interface SitioElement {
  id: string;
  sitio: string;
  ciudad: string;
  categoria: string;
  descripcion: string;
  estado: string
}



@Component({
  selector: 'app-listar-sitios',
  templateUrl: './listar-sitios.component.html',
  styleUrls: ['./listar-sitios.component.css']
})
export class ListarSitiosComponent implements OnInit {
  public displayedColumns: string[] = ['sitio', 'ciudad', 'categoria', 'descripcion', 'estado', "editar"];
  public dataSource: MatTableDataSource<SitioElement>;
  public error = "";
  public cargando = false;
  public sitos = [];
  public listaSitos: SitioElement[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private sitiosService: SitiosService) {
    this.listarSitios();
  }

  ngOnInit() {
  }

  listarSitios() {
    console.log("listarSitios")
    this.error = "";
    this.cargando = true;
    this.sitiosService.listarSitios()
      .subscribe(
        data => {          
          this.sitos = JSON.parse(JSON.stringify(data));
          this.sitos.forEach(sitio => {
            let estado = "Activo"
            if (!sitio.activo) { estado = "Inactivo"; }
            this.listaSitos.push({ 'id': sitio.id,'sitio': sitio.nombre, 'ciudad': sitio.municipio?.nombre, 'categoria': sitio.categoria?.nombre, 'descripcion': sitio.idiomas?.es?.descripcion, 'estado': estado })
          });
          this.dataSource = new MatTableDataSource(this.listaSitos);
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
