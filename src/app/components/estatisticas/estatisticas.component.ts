import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estatisica',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  formValues: FormGroup;
  usersService: UsersService;
  notificacionesService: NotificationsService;
  rolesService: RolesService;
  router: Router;

  constructor(
    @Inject(UsersService) usersService: UsersService,
    @Inject(NotificationsService) notificacionesService: NotificationsService,
    @Inject(RolesService) rolesService: RolesService,
    @Inject(Router) router: Router
  ) {
    this.usersService = usersService;
    this.notificacionesService = notificacionesService;
    this.rolesService = rolesService;
    this.router = router;

    this.formValues = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
    this.renderCasosProvaveisDengueChart();
  }

  renderCasosProvaveisDengueChart() {
    const ctx = document.getElementById('casosProvaveisDengueChart') as HTMLCanvasElement;
    const casosProvaveisDengueChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['SE 01', 'SE 02', 'SE 03', 'SE 04', 'SE 05', 'SE 06', 'SE 07', 'SE 08', 'SE 09', 'SE 10'],
        datasets: [{
          label: 'Casos Prováveis de Dengue (2024)',
          data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55], // Dados fictícios
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async onSubmit() {
    // Seu código de submissão
  }

  controlError(nombreCampo: string, tipoError: string): boolean {
    // Seu código de controle de erro
    return false; // apenas para evitar erro booleano, substitua conforme necessário
  }
}
