import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslateConfigService {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
    
  changeLanguage(type: string) {
    this.translate.use(type);
  }
}
