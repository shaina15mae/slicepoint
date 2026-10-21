import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true
})
export class SplashPage implements OnInit, OnDestroy {

  private redirectTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectTimer = setTimeout(() => {
      this.router.navigateByUrl('/home', {
        replaceUrl: true
      });
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }
}