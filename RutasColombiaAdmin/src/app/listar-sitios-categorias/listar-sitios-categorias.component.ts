import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SitiosCategoriasService } from 'app/services/sitios-categorias.service';

export interface SitioElement {
  id: string;
  nombre: string;
  descripcion: string;  
}
@Component({
  selector: 'app-listar-sitios-categorias',
  templateUrl: './listar-sitios-categorias.component.html',
  styleUrls: ['./listar-sitios-categorias.component.css']
})
export class ListarSitiosCategoriasComponent implements OnInit {
  public displayedColumns: string[] = ['nombre','descripcion', "editar"];
  public dataSource: MatTableDataSource<SitioElement>;
  public error = "";
  public cargando = false;
  public categorias = [];
  public listaCategorias: SitioElement[] = [];

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
            this.listaCategorias.push({ 'id': categoria.id,'nombre': categoria.nombre,'descripcion': categoria.descripcion })
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
