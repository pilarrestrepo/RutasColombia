import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SitiosCategoriasService } from 'app/services/sitios-categorias.service';
import { environment } from 'environments/environment';

export interface CateroriaElement {
  id: string;
  nombre: string;
  descripcion: string;  
  imagenUrl: string;  
}
@Component({
  selector: 'app-listar-sitios-categorias',
  templateUrl: './listar-sitios-categorias.component.html',
  styleUrls: ['./listar-sitios-categorias.component.css']
})
export class ListarSitiosCategoriasComponent implements OnInit {
  public displayedColumns: string[] = ['imagenUrl','nombre','descripcion', "editar"];
  public dataSource: MatTableDataSource<CateroriaElement>;
  public error = "";
  public cargando = false;
  public categorias = [];
  public listaCategorias: CateroriaElement[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private sitiosCategoriasService: SitiosCategoriasService) {
    this.listarCategorias();
  }

  ngOnInit() {
  }

  listarCategorias() {
    console.log("listarCategorias")
    this.error = "";
    this.cargando = true;
    this.sitiosCategoriasService.listarSitiosCategorias()
      .subscribe(
        data => {          
          this.categorias = JSON.parse(JSON.stringify(data));
          this.categorias.forEach(categoria => {            
            let imagenUrl = environment.baseUrl + categoria.urlImagen
            this.listaCategorias.push({ 'id': categoria.id,'nombre': categoria.nombre,'descripcion': categoria.descripcion,'imagenUrl': imagenUrl })
          });
          this.dataSource = new MatTableDataSource(this.listaCategorias);
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
