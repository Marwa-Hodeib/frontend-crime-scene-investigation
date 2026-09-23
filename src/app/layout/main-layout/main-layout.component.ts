import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LadybugComponent } from '../../ladybug/ladybug.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, LadybugComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
