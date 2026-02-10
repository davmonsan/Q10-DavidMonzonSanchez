import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from './services/rick-morty';
import { PostService } from './services/post';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App {

  // ===== EJERCICIO 1 (GET) =====
  characters = signal<any[]>([]);
  page = signal(1);
  totalPages = signal(1);

  constructor(
    private rickService: RickMortyService,
    private postService: PostService
  ){}

  ngOnInit(){
    this.cargarPersonajes();
  }

  cargarPersonajes(){
    this.rickService.getCharacters(this.page()).subscribe((res: any) => {
      this.characters.set(res.results.slice(0,5));
      this.totalPages.set(res.info.pages);
    });
  }


  siguiente(){
    if(this.page()<this.totalPages()){
      this.page.update(p=>p+1);
      this.cargarPersonajes();
    }
  }

  anterior(){
    if(this.page()>1){
      this.page.update(p=>p-1);
      this.cargarPersonajes();
    }
  }

  // ===== EJERCICIO 2 (POST) =====
  title="";
  body="";
  userId=1;

  response = signal<any|null>(null);

  enviarPost(){
    const nuevoPost={
      title:this.title,
      body:this.body,
      userId:this.userId
    };

    this.postService.crearPost(nuevoPost).subscribe(res=>{
      this.response.set(res);
    });
  }
}
