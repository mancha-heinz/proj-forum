import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Imagem, ImagensService } from 'src/app/services/imagens.service';

@Component({
  selector: 'app-imagens',
  templateUrl: './imagens.page.html',
  styleUrls: ['./imagens.page.scss'],
})
export class ImagensPage implements OnInit {
  imagem: Imagem = {
    name: "",
    filepath: "",
    size: 0
  }

  imagemId = null;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  UploadedFileURL: Observable<string>;
  images: Observable<Imagem[]>;

  //File details  
  fileName: string;
  fileSize: number;

  //Status check 
  isUploading: boolean;
  isUploaded: boolean;

  private imageCollection: AngularFirestoreCollection<Imagem>;

  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private imagemService: ImagensService,
    private loading: LoadingController,
    private storage: AngularFireStorage,
    private database: AngularFirestore) {
    this.isUploading = false;
    this.isUploaded = false;
    this.imageCollection = database.collection<Imagem>('freakyImages');
    this.images = this.imageCollection.valueChanges();
  }

  ngOnInit() {
  }

  uploadFile(event: FileList) {
    console.log('chamou uploadImg');
    const file = event.item(0)
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    const path = `freakyStorage/${new Date().getTime()}_${file.name}`; //nome tabela

    const customMetadata = { app: 'Freaky Image Upload Demo' };

    const fileRef = this.storage.ref(path);

    this.task = this.storage.upload(path, file, { customMetadata });

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: Imagem) {
    console.log('chamou addImg');
    const id = this.database.createId();

    this.imageCollection.doc(id).set(image).then(resp => {
      console.log('resp: ' + resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }
}
