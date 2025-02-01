import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PhysicalDescription } from 'src/app/main/models/PhysicalDescription';
import { PhysicalDescriptionModalComponent } from '../physical-description-modal/physical-description-modal.component';
import { HTTPService } from 'src/app/main/services/HTTPService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-physical-description',
  templateUrl: './physical-description.component.html',
  styleUrls: ['./physical-description.component.css']
})
export class PhysicalDescriptionComponent extends URLLoader implements OnInit, AfterViewInit {

  loadingIndicator = true;
  reorderable = true;

  descriptions$: BehaviorSubject<PhysicalDescription[]> = new BehaviorSubject<PhysicalDescription[]>([]);
  descriptions: PhysicalDescription[] = [];
  selectedDescription: PhysicalDescription | null = null;
  markdownContent: string;

  constructor(
    private toastr: ToastrService,
    private descriptionService: HTTPService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.initDataTable('dt_pd');
  }

  ngOnInit(): void {
    this.loadDescriptions();
    this.initMap();
    this.loadBookLocations();
  }

  refreshData(): void {
    this.loadDescriptions();
  }

  loadDescriptions(): void {
    this.loadingIndicator = true;
    this.descriptionService.getAllPhysicalDescriptions().subscribe(data => {
      this.descriptions = data;
      this.descriptions$.next(data);
      this.loadingIndicator = false;
    });
  }

  openAddDialog(): void {
    const modalRef = this.modalService.open(PhysicalDescriptionModalComponent);
    modalRef.componentInstance.description = {} as PhysicalDescription;

    modalRef.result.then(result => {
      if (result) {
        this.descriptionService.createPhysicalDescription(result).subscribe(() => {
          this.loadDescriptions();
        });
      }
    }).catch(error => console.log(error));
  }

  openEditDialog(description: PhysicalDescription): void {
    this.selectedDescription = { ...description };
    const modalRef = this.modalService.open(PhysicalDescriptionModalComponent);
    modalRef.componentInstance.description = this.selectedDescription;

    modalRef.result.then(result => {
      if (result) {
        this.descriptionService.updatePhysicalDescription(result.id, result).subscribe(() => {
          this.loadDescriptions();
        });
      }
    }).catch(error => console.log(error));
  }

  deleteRow(row: PhysicalDescription): void {
    this.descriptions = this.descriptions.filter(r => r !== row);
    this.descriptions$.next(this.descriptions);
    this.toastr.success('Item removed successfully!', 'Success');
    this.deleteDescription(row.id);
  }

  deleteDescription(id: number): void {
    this.descriptionService.deletePhysicalDescription(id).subscribe(() => {
      
      this.loadDescriptions();
    });
  }

  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    const temp = this.descriptions.filter(d => d.height.toString().includes(val) || d.width.toString().includes(val));
    this.descriptions = temp;
    this.descriptions$.next(temp);
  }

  onSelect({ selected }): void {
    console.log('Selected row:', selected);
  }

  onActivate(event): void {
    console.log('Activate Event:', event);
  }









  private map: any;

  
 

  private initMap(): void {
    // Define bounds for the image (based on the dimensions of the image)
   /*  const bounds = [[0, 0], [1000, 1000]]; // Replace with the actual size of your image

    // Initialize the map and set its view to the bounds
    this.map = L.map('map', {
      crs: L.CRS.Simple,  // Use a simple coordinate system
      minZoom: -1,  // Allow zooming out
      maxZoom: 4,   // Allow zooming in
    }).fitBounds(bounds);

    // Add the image overlay (library map image)
    L.imageOverlay('assets/library-map.svg', bounds).addTo(this.map); // Replace with your image path
 */
    // Optional: Add a grid or scale if needed
  }

  private addSectionMarkers(): void {
    // Example of adding a marker for different sections
    const fictionSection = L.marker([200, 300]).addTo(this.map); // Replace with actual coordinates
    fictionSection.bindPopup('Fiction Section');

    const nonFictionSection = L.marker([400, 500]).addTo(this.map); // Replace with actual coordinates
    nonFictionSection.bindPopup('Non-Fiction Section');
    
    // Add more markers as needed...
  }

  private loadBookLocations(): void {
    this.getBookLocations().subscribe(locations => {
      locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(this.map);
        marker.bindPopup(`<b>${location.section}</b><br>${location.details}`).openPopup();
      });
    });
  }

  getBookLocations(): Observable<any> {
    // Fake data for testing
    const fakeLocations = [
      {
        section: 'Fiction',
        details: 'Books A-Z',
        lat: 200,  // Replace with actual coordinates in your image
        lng: 300
      },
      {
        section: 'Non-fiction',
        details: 'Biographies, History, etc.',
        lat: 400,
        lng: 500
      },
      {
        section: 'Science',
        details: 'Physics, Chemistry, Biology',
        lat: 600,
        lng: 300
      },
      {
        section: 'Technology',
        details: 'Computing, AI, Robotics',
        lat: 800,
        lng: 600
      }
      // Add more fake data as needed
    ];
    return of(fakeLocations);
  }






  departments: Department[] = [
    { id: 1, name: 'Fiction', shelves: this.createShelves(8) },
    { id: 2, name: 'Non-Fiction', shelves: this.createShelves(8) },
    { id: 3, name: 'Science', shelves: this.createShelves(8) },
    { id: 4, name: 'Technology', shelves: this.createShelves(8) },
    { id: 5, name: "Children's Books", shelves: this.createShelves(8) }
  ];

  // Function to create shelves for a department
  createShelves(shelfCount: number): Shelf[] {
    const shelves: Shelf[] = [];
    for (let i = 1; i <= shelfCount; i++) {
      shelves.push({ id: i, rows: this.createRows(15) });
    }
    return shelves;
  }

  // Function to create rows for a shelf
  createRows(rowCount: number): Row[] {
    const rows: Row[] = [];
    for (let i = 1; i <= rowCount; i++) {
      rows.push({ id: i });
    }
    return rows;
  }
}

interface Row {
  id: number;
}

interface Shelf {
  id: number;
  rows: Row[];
}

interface Department {
  id: number;
  name: string;
  shelves: Shelf[];
}