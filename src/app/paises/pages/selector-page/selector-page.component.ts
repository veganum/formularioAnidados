import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llenar Selectores de
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //! Cuando cambie la regiones
    //?Old
    // this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
    //   console.log(region);
    //   this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
    //     console.log(paises);
    //     this.paises = paises;
    //   });
    // });
    //?New
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
      });
    //! Cuando cambie el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe((pais) => {
        console.log(pais);
        this.fronteras = pais?.borders || [];
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
