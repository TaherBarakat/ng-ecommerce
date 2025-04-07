import { Component, Input } from '@angular/core';
import { Course } from '../../product.interface';
import { LucideAngularModule, ListIcon } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product: Course | undefined;
  readonly ListIcon = ListIcon;
  ngOnInit() {
    console.log(this.product, 'card ');
  }
}
