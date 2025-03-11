import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Person {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personsData: Person[] = [];  // Array to store persons
  private personsSubject = new BehaviorSubject<Person[]>(this.personsData);
  persons$ = this.personsSubject.asObservable();

  private editingIndex: number | null = null; // Track which index is being edited

  constructor() {}

  addPerson(person: Person) {
    this.personsData.push(person);
    this.personsSubject.next([...this.personsData]); // Emit updated list
  }

  updatePerson(person: Person) {
    if (this.editingIndex !== null) {
      this.personsData[this.editingIndex] = person;
      this.personsSubject.next([...this.personsData]); // Emit updated list
      this.editingIndex = null; // Reset editing index after update
    }
  }

  deletePerson(index: number) {
    this.personsData.splice(index, 1);
    this.personsSubject.next([...this.personsData]); // Emit updated list
  }

  setEditingIndex(index: number) {
    this.editingIndex = index;
  }

  getEditingIndex(): number | null {
    return this.editingIndex;
  }
}
