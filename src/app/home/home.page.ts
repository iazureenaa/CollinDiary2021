import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Globalization } from '@ionic-native/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public App_Name: string;
  public Home_Menu_1: string;
  public Home_Menu_2: string;
  public Language: string;
  language: string; //pilihan user

  constructor(
    public navCntrl: NavController,
    private globalization: Globalization,
    private _translate: TranslateService
  ) {}

  ionViewDidEnter(): void {
    this.getDeviceLanguage();
  }

  // i18n functions
  languages = [
    //options yg boleh dipilih
    { name: 'Malay', code: 'ms' },
    { name: 'English', code: 'en-GB' },
  ];

  _initialiseTranslation(): void {
    this._translate.get('App_Name').subscribe((res: string) => {
      this.App_Name = res;
    });
    this._translate.get('Home_Menu_1').subscribe((res: string) => {
      this.Home_Menu_1 = res;
    });
    this._translate.get('Home_Menu_2').subscribe((res: string) => {
      this.Home_Menu_2 = res;
    });
    this._translate.get('Language').subscribe((res: string) => {
      this.Language = res;
    });
  }

  public changeLanguage(): void {
    this._translateLanguage();
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    this._initialiseTranslation();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en-GB');
    if (language) {
      this.language = language;
    } else {
      // Set your language here
      this.language = 'en-GB';
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    console.log('init language here');
    console.log(window.Intl);
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language);
    } else {
      this.globalization
        .getPreferredLanguage()
        .then((res) => {
          this._initTranslate(res.value);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  //navigate functions
  goToAddDiaryPage() {
    this.navCntrl.navigateForward('/add-diary');
  }

  goToHistoryPage() {
    this.navCntrl.navigateForward('/history');
  }
}
