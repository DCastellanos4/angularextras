import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Archivo } from "../models/archivo";
import { Injectable } from "@angular/core";

@Injectable()
export class UploadService {
    constructor(private _http: HttpClient) {

    }
    async postPhoto(a: Archivo): Promise<any> {
        let url = environment.urlApiSubida;
        let request = "api/TestingFiles"
        return firstValueFrom(this._http.post(url + request, a))
    }
}