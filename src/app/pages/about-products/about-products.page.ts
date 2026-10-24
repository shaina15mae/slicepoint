import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-about-products',
  templateUrl: './about-products.page.html',
  styleUrls: ['./about-products.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent],
})
export class AboutProductsPage {}
