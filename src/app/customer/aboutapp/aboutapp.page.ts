import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-aboutapp',
  templateUrl: './aboutapp.page.html',
  styleUrls: ['./aboutapp.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent],
})
export class AboutappPage {}