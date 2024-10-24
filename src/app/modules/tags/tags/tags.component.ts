import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  implements OnInit{

  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  @HostListener('window:resize', ['$event'])
onResize(event: Event): void {
  const width = window.innerWidth;
  const height = window.innerHeight;
  this.renderer.setSize(width, height);
  const aspect = width / height;
  const viewSize = 150;
  this.camera.left = -viewSize * aspect;
  this.camera.right = viewSize * aspect;
  this.camera.top = viewSize;
  this.camera.bottom = -viewSize;
  this.camera.updateProjectionMatrix();
}

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private loader: THREE.TextureLoader;
  private fontLoader: THREE.FontLoader;
  private shelves: any[] = [];
  private controls!: OrbitControls;
  pos=1;

  private intersectedObjects: THREE.Intersection[] = [];

private currentBook: THREE.Mesh | null = null;
private raycaster = new THREE.Raycaster();
private mouse = new THREE.Vector2();


  constructor(private libraryService: HTTPService) {
    this.loader = new THREE.TextureLoader();
    this.fontLoader = new THREE.FontLoader();
  }

  ngOnInit(): void {
    //window.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.libraryService.getAllShelves().subscribe((shelves) => {
      this.shelves = [
        {
          id: 1,
          name: 'Shelf 1',
          books: [
            { id: 1, title: 'Book 1', imageUrl: 'assets/images/book.jpg' },
            { id: 2, title: 'Book 2', imageUrl: 'assets/images/book2.jpg' }
          ]
        },
        {
          id: 2,
          name: 'Shelf 2',
          books: [
            { id: 3, title: 'Book 3', imageUrl: 'assets/images/book2.jpg' }
          ]
        },
        {
          id: 3,
          name: 'Shelf 3',
          books: [
            { id: 3, title: 'Book 3', imageUrl: 'assets/images/book3.jpg' }
          ]
        },
        {
          id: 4,
          name: 'Shelf 4',
          books: [
            { id: 3, title: 'Book 3', imageUrl: 'assets/images/book4.jpg' },
          ]
        }
      ];
      //this.shelves = shelves;
      

      this.initializeScene();
      this.addShelvesToScene();
      this.animate();
        
    });
  }

  private initializeScene(): void {
    this.scene = new THREE.Scene();
    const backgroundTexture = new THREE.TextureLoader().load('assets/images/wall.jpg');
        this.scene.background = backgroundTexture; // Set the background image
  
    // Adjust the orthographic camera to fit the entire scene with larger objects
    const aspect = window.innerWidth / window.innerHeight;
    const viewSize = 150; // Increased viewSize to fit larger objects
  
    this.camera = new THREE.OrthographicCamera(
      -viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 0.1, 1000
    );
    this.camera.position.set(0, 80, 200); // Position the camera to view the entire scene
    this.camera.lookAt(0, 0, 0);
  
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  
    const light = new THREE.AmbientLight(0x404040);
    this.scene.add(light);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 80, 80).normalize();
    this.scene.add(directionalLight);
  
    // Add OrbitControls for zoom and pan
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true; // Disable zoom to fit everything initially
    this.controls.enablePan = true; // Disable pan to keep everything in view
    this.controls.enableRotate = false;
    this.controls.update();
  }
  

  private addShelvesToScene(): void {
    this.shelves.forEach((shelf, index) => {
      this.addShelf(shelf, index);
    });
  }

  private addShelf(shelf: any, index: number): void {
    // Load shelf image
    this.loader.load('assets/images/shelf.png', (texture) => {
      const shelfMaterial = new THREE.SpriteMaterial({ map: texture });
    const shelfSprite = new THREE.Sprite(shelfMaterial);
    shelfSprite.scale.set(460, 12, 1); // Larger shelf dimensions (true size)
    
    // Position shelves with vertical spacing
    const spacing = 40; // Increased spacing
    shelfSprite.position.set(0, index * spacing - (this.shelves.length * spacing) / 2, 0);

    this.scene.add(shelfSprite);

    // Add shelf label
    this.addTextLabel(`Shelf ${shelf.id}`, shelfSprite.position.x, shelfSprite.position.y - 4);
  
    
      // Fetch and add books
      shelf.books.forEach((book, bookIndex) => {

        this.addBook(book, bookIndex, shelfSprite.position.x, shelfSprite.position.y);
        this.pos+=this.pos

      });
      this.pos=1
    });
  }

  private addBook(book: any, bookIndex: number, shelfX: number, shelfY: number): void {
    // Load book image
    this.loader.load(book.imageUrl, (texture) => {
      const bookMaterial = new THREE.SpriteMaterial({ map: texture });
      const bookSprite = new THREE.Sprite(bookMaterial);
      bookSprite.scale.set(20, 30, 1); // Larger book dimensions (true size)
      bookSprite.position.set(shelfX - 210 + bookIndex * 30.8, shelfY + 16, 0); // Adjusted position
      bookSprite.userData = book;
      this.scene.add(bookSprite);
  
      // Add book label
     // this.addTextLabel(`Book ${book.id}`, bookSprite.position.x, bookSprite.position.y + 4);
       });
  }


  

  private addTextLabel(text: string, x: number, y: number): void {
    const loader = new THREE.FontLoader();
    loader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: 5.5,
        height: 0.1,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xb7a294 });
      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      mesh.position.set(x-260, y*0.9, 0);
      this.scene.add(mesh);
    });
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }


/*   private showBookInfo(bookMesh: THREE.Mesh): void {
    const bookInfo = bookMesh.userData as any;
    console.log(`Book ID: ${bookInfo.id}, Title: ${bookInfo.title}`);
    // Implement your own logic to show the book info (e.g., using a UI element)
  }
 */

  
  
  /* 
  private handleHover(): void {
    const intersectedObject = this.intersectedObjects[0].object as THREE.Mesh;
    intersectedObject.scale.set(1.2, 1.2, 1.2);
      this.currentBook = intersectedObject;
      this.showBookInfo(intersectedObject);
  }

  private onMouseMove(event: MouseEvent): void {
    // Normalize mouse coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Update the raycaster with the camera and mouse coordinates
    this.raycaster.ray.origin.copy(this.camera.position);
    this.raycaster.ray.direction.set(this.mouse.x, this.mouse.y, 1).unproject(this.camera).sub(this.camera.position).normalize();
    
    // Find intersections
    this.intersectedObjects = this.raycaster.intersectObjects(this.scene.children, true);
  
    // Handle intersections
    this.handleHover();
  } */
  
  

}
