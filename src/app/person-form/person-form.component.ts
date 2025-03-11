import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  personForm: FormGroup;
  isEditing = false;
  @Output() formClosed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.personForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
    });

    this.personService.persons$.subscribe(data => {
      const index = this.personService.getEditingIndex();
      if (index !== null && data[index]) {
        this.isEditing = true;
        this.personForm.setValue(data[index]);
      }
    });
  }

  addOrUpdatePerson() {
    if (this.personForm.valid) {
      if (this.isEditing) {
        this.personService.updatePerson(this.personForm.value);
        this.isEditing = false;
      } else {
        this.personService.addPerson(this.personForm.value);
      }
      this.personForm.reset();
      this.formClosed.emit();
    }
  }

  resetPerson() {
    this.personForm.reset();
  }
}
