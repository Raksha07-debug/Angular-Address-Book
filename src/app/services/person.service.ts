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
  private personsData: Person[] = [];  // Store persons list
  private personsSubject = new BehaviorSubject<Person[]>(this.personsData);
  persons$ = this.personsSubject.asObservable();

  private editingIndex: number | null = null; // Track editing index

  constructor() {}

  addPerson(person: Person) {
    this.personsData.push(person);
    this.personsSubject.next([...this.personsData]); // Emit updated list
  }

  updatePerson(person: Person) {
    if (this.editingIndex !== null && this.editingIndex < this.personsData.length) {
      this.personsData[this.editingIndex] = person;
      this.personsSubject.next([...this.personsData]); // Emit updated list
      this.editingIndex = null; // Reset editing index
    }
  }

  deletePerson(index: number) {
    if (index >= 0 && index < this.personsData.length) {
      this.personsData.splice(index, 1);
      this.personsSubject.next([...this.personsData]); // Emit updated list
    }
  }

  setEditingIndex(index: number) {
    if (index >= 0 && index < this.personsData.length) {
      this.editingIndex = index;
    }
  }

  getEditingIndex(): number | null {
    return this.editingIndex;
  }
}