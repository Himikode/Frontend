import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../@services/user.service';

@Component({
  selector: 'andromeda-logged-user',
  styleUrls: ['./logged-user.component.scss'],
  templateUrl: './logged-user.component.html',
})
export class LoggedUserComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;



  userMenu = [ { title: 'Log out', link: '/auth/logout' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private usersService: UserData,
              private userService: UserService) {
  }

  ngOnInit() {

		this.userService.currentUser.subscribe(user => {
      this.user = user;
		});

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  
}
