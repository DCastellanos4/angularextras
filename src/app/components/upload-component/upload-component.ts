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
  @ViewChild('archivo') archivo!: ElementRef;

  postFoto(): void {
    // Obtenemos el primer archivo seleccionado en el input.
    const archivo = this.archivo.nativeElement.files?.[0];

    // Si no se ha seleccionado ningún archivo, terminamos el método.
    if (!archivo) {
      return;
    }

    // FileReader permite leer el contenido del archivo en el navegador.
    const lector = new FileReader();

    // Esta función se ejecuta cuando FileReader termina de leer el archivo.
    lector.onload = async () => {
      // El resultado contiene el archivo convertido a una cadena Base64.
      const resultado = lector.result as string;

      // Eliminamos el prefijo "data:image/...;base64," y dejamos solo el Base64.
      const fileContent = resultado.split(',')[1];

      // Creamos el objeto con el nombre y el contenido que necesita la API.
      const a = new Archivo(archivo.name, fileContent);

      // Comprobamos en consola los datos que vamos a enviar.
      console.log(a);

      // Enviamos el archivo a la API mediante el servicio.
      const res = await this._es.postPhoto(a);

      // Mostramos en consola la respuesta de la API.
      console.log(res);
    };

    // Iniciamos la lectura del archivo como una cadena Base64.
    // Esta línea provoca que se ejecute la función lector.onload al terminar.
    lector.readAsDataURL(archivo);
  }
}
