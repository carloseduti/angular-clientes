import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { SessionService } from 'src/app/core/services/session.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CooperSystem';
  showLoader: boolean;
  theme: string;

  constructor(private loaderService: LoaderService,
    private themeService: ThemeService) {
      this.theme = "theme-teal";
  }

  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });

    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });
  }

  ngOnDestroy() {
    this.themeService.theme.observers.forEach(function (element) { element.complete(); });
    this.loaderService.status.observers.forEach(function (element) { element.complete(); });
  }
}
