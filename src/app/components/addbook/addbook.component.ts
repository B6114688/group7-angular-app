import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  bookType: string[] = ['CARTOON','HISTORY','NOVEL'];

  bookForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
  });

  previewLoaded: boolean = false;

  constructor(private ps: BooksService) { }

  ngOnInit(): void {
  }

  addBook(){
    this.ps.addBook(this.bookForm.value).subscribe (
      data => {
        alert('Book added successfully');
        this.bookForm.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.bookForm.patchValue({
          img: reader.result as string
        })
      }
    }
  }

  resetForm(){
    this.bookForm.reset();
    this.previewLoaded = false;
  }


}
