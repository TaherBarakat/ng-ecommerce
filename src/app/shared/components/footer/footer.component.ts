import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'bi-discord', url: 'https://discord.gg/yourchannel' },
    { icon: 'bi-twitch', url: 'https://twitch.tv/yourchannel' },
    { icon: 'bi-twitter-x', url: 'https://x.com/yourhandle' },
    { icon: 'bi-instagram', url: 'https://instagram.com/yourhandle' },
  ];

  quickLinks = [
    { name: 'Gaming Mice', route: '/mice' },
    { name: 'Mechanical Keyboards', route: '/keyboards' },
    { name: 'Custom PCs', route: '/custom-pcs' },
    { name: 'Gaming Laptops', route: '/laptops' },
    { name: 'Esports Gear', route: '/esports' },
  ];

  legalLinks = [
    { name: 'Terms', route: '/terms' },
    { name: 'Privacy', route: '/privacy' },
    { name: 'Returns', route: '/returns' },
    { name: 'FAQ', route: '/faq' },
  ];
}
