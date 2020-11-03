import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

interface ProfileMenu {
  title: string;
  icon: Icon;
  target: string;
}

interface Icon {
  icon: string;
  pack: string;
}

interface UserInfo {
  nombre: string;
  username: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  user: any;
  public userInfo: UserInfo;

  public profileMenu: ProfileMenu[] = [
    /*  {
        title: 'Profile',
        icon: { icon: 'user-circle', pack: 'fa' },
        target: 'main/profile',
      },*/
    {
      title: 'Log Out',
      icon: { icon: 'sign-out-alt', pack: 'fa' },
      target: 'login',
    },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    private Login: LoginService
  ) { }

  ngOnInit() {
    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'menu-action'),
        map(({ item: { target } }) => target)
      )
      .subscribe((target) => {

        switch (target) {
          case 'login':
            this.Login.logout();
            this.router.navigate([target]);
            break;

          default:
            this.router.navigate([target]);
            break;
        }
      });

    this.userInfo = this.Login.getUser();
    setTimeout(() => {
      this.sidebarService.toggle(false, 'menu-sidebar');
    }, 100);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

}
