import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  usuario: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || '';
    if (!localStorage.getItem('sesionActiva')) {
      this.router.navigate(['/login']);
    }
  }
}
