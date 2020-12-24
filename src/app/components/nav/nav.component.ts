import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() devicexs: boolean;

  menuItems = [{opcion: 'empresa', activo: false}, {opcion: 'administrador', activo: false}];
  opcionElejida = 'Panel de Control';

}
