import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from './services/rick-morty';
import { PostService } from './services/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit{

  // ===== EJERCICIO 1 =====
  characters: any[] = [];
  page: number = 1;
  totalPages: number = 1;

  constructor(
    private rickService: RickMortyService,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.cargarPersonajes();
    setTimeout(() => {}, 0);
  }

  cargarPersonajes(){
    this.rickService.getCharacters(this.page).subscribe((res: any) => {
      this.characters = res.results.slice(0,5);
      this.totalPages = res.info.pages;
    });
  }

  siguiente(){
    if(this.page < this.totalPages){
      this.page++;
      this.cargarPersonajes();
    }
  }

  anterior(){
    if(this.page > 1){
      this.page--;
      this.cargarPersonajes();
    }
  }

  // ===== EJERCICIO 2 =====
  title: string = "";
  body: string = "";
  userId: number = 1;

  response: any = null;

  enviarPost(){
    const nuevoPost = {
      title: this.title,
      body: this.body,
      userId: this.userId
    };

    this.postService.crearPost(nuevoPost).subscribe((res:any)=>{
      this.response = res;
    });
  }
}
