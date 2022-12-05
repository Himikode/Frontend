import { ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbRequestPasswordComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';



@Component({
  selector: 'hkcoffee-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPasswordComponent extends NbRequestPasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'email';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  @ViewChild("dialog") dialog: TemplateRef<any>;

  constructor(
      protected authService: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) protected options = {},
      protected cd: ChangeDetectorRef,
      protected router: Router,
      protected dialogService: NbDialogService
  ) {
    super(authService, options, cd, router);
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      isLogged => {
          if (isLogged) {
            this.router.navigate(['pages/dashboard']); // Your redirection goes here
          }
      }
    );
  }

  close(dialog): void {
    setTimeout(() => {
      dialog.close();
      return this.router.navigateByUrl('/auth/login');
    }, this.redirectDelay);
    this.cd.detectChanges();
  }


  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true; 
    this.authService.requestPassword(this.strategy, this.user).subscribe(
      (result: NbAuthResult) => {
        this.submitted = false;
        if (result.isSuccess()) {
          this.messages = result.getMessages();
          this.dialogService.open(this.dialog, {
            context: {
              title: 'This is a title passed to the dialog component',
            },
          });          
        } else {
          this.errors = result.getErrors();
        }



      }
    );
  }


}