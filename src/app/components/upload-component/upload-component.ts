import { Component, ElementRef, ViewChild } from '@angular/core';
import { Archivo } from '../../models/archivo';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-component',
  standalone: false,
  styleUrl: './upload-component.css',
  templateUrl: './upload-component.html',
})
export class UploadComponent {
  constructor(private _es: UploadService) {

  }
  @ViewChild('archivo') archivo!: ElementRef<HTMLInputElement>;

  postFoto(): void {
    const archivo = this.archivo.nativeElement.files?.[0];

    if (!archivo) {
      return;
    }

    const lector = new FileReader();

    lector.onload = async () => {
      const resultado = lector.result as string;
      const fileContent = resultado.split(',')[1];
      const a = new Archivo(archivo.name, fileContent);

      console.log(a);

      const res = await this._es.postPhoto(a);
      console.log(res);
    };

    lector.readAsDataURL(archivo);
  }
}
