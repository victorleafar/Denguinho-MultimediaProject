import { Component } from '@angular/core';
import { AvisosService } from 'src/app/services/avisos.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TablaRefreshService } from 'src/app/services/tabla-refresh.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  avisos: any[];
  deleteAllowed: boolean = false;

  constructor(
    private usuariosService: UsersService,
    private avisosService: AvisosService,
    private notificationService: NotificationsService,
    private tablaRefreshService: TablaRefreshService
  ) {
    this.avisos = [];
    if (this.usuariosService.isLogged()) {
      this.tablaRefreshService.refreshTablaSubject.subscribe(() => {
        this.printTable();
      });
    }
  }

  async printTable(): Promise<void> {
    try {
      const response = await this.avisosService.getAll();
      if (response.fatal) {
        return this.notificationService.showError(response.fatal);
      }
      this.avisos = response;
    } catch(error) {
      this.notificationService.showError("Algo ha ido mal al cargar la tabla, mira el error en la consola");
      console.log(error)
    }
  }

  playAudio(): void {
    const audio = new Audio();
    audio.src = 'assets/audio/audio.mp3';
    audio.load();
    audio.play();
  }
}
