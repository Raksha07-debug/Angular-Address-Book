import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PersonListComponent, PersonFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showForm = false;
  show=false;

  toggleForm() {
    this.showForm = !this.showForm;
    this.show = !this.show;
  }
  closeForm() {
    this.showForm = false; 
  }
}