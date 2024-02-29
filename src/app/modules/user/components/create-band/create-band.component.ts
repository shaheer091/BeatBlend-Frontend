import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css']
})
export class CreateBandComponent implements OnInit {
  createBandForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createBandForm = this.formBuilder.group({
      bandName: [''],
      image: [''],
      members: this.formBuilder.array([]) 
    });
  }

  createMemberFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      instrument: ['']
    });
  }

  addMember(): void {
    const membersArray = this.createBandForm.get('members') as any;
    membersArray.push(this.createMemberFormGroup());
  }

  removeMember(index: number): void {
    const membersArray = this.createBandForm.get('members') as any;
    membersArray.removeAt(index);
  }

  onSubmit(): void {
    const formData = this.createBandForm.value;
    console.log('Band form data:', formData);
    // Call a service to submit the form data to the backend
  }
}
