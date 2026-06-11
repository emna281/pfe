import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-component-card',
  imports: [],
  templateUrl: './component-card.html',
  styleUrl: './component-card.css',
})
export class ComponentCard {
   @Input() title!: string;
  @Input() desc: string = '';
  @Input() className: string = '';

}
