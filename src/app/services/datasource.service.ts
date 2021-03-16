import { Injectable } from '@angular/core';
import { BrowserDatasourceService } from "./browser-datasource.service";
import { DatasourceConnector } from "../interfaces/datasource-connector.interface";
import { DEFAULT_DATASOURCE } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  private readonly connector: DatasourceConnector | null;

  constructor(
    public browserDatasource: BrowserDatasourceService
  ) {
    switch (DEFAULT_DATASOURCE) {
      case 'browser':
        this.connector = browserDatasource;
        break;
      default:
        this.connector = null;
        throw new Error(`The configured datasource ${DEFAULT_DATASOURCE} is not supported`);
    }
  }

  public getConnector(): DatasourceConnector {
    const connector = this.connector;
    return connector!;
  }

}
