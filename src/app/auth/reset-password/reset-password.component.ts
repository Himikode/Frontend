import { ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef, Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbResetPasswordComponent, NbAuthService, NB_AUTH_OPTIONS, NbAuthResult } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'hkcoffee-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent extends NbResetPasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'email';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  token: any = null;
  @ViewChild("dialog") dialog: TemplateRef<any>;

  constructor(
    protected authService: NbAuthService, 
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private activatedRoute:ActivatedRoute,
    protected dialogService: NbDialogService
  ) {
    super(authService, options, cd, router);
    this.token=this.activatedRoute.snapshot.paramMap.get("token");
    this.user.token = this.token;
  }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      isLogged => {
          if (isLogged) {
            this.router.navigate(['pages/dashboard']); // Your redirection goes here
          }
      }
    );
    if (!this.token) {
      this.showMessages = {
        error: true
      };
      this.errors = ['El token no es válido.'];
    }
  }

  close(dialog): void {
    setTimeout(() => {
      dialog.close();
      return this.router.navigateByUrl('/auth/login');
    }, this.redirectDelay);
    this.cd.detectChanges();
  }


  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user).subscribe(
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

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
        this.cd.detectChanges();
      }
    );
  }

}