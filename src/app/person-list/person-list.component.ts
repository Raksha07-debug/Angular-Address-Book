import { Component } from '@angular/core';
import { PersonService, Person } from '../services/person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, PersonFormComponent],  // Import PersonFormComponent
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {
  persons: Person[] = [];
  showForm = false;  // Ensure showForm is defined

  constructor(private personService: PersonService) {
    this.personService.persons$.subscribe(data => {
      this.persons = data;
    });
  }

  editPerson(person: Person, index: number) {
    this.personService.setEditingIndex(index);
    this.showForm = true;  // Show form when editing
  }

  deletePerson(index: number) {
    this.personService.deletePerson(index);
  }

  closeForm() {
    this.showForm = false;  // Hide form after closing
  }
}
