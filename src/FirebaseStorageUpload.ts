import { storage } from "firebase/app";

export default class FirebaseStorageUpload {
  readonly filename: string;
  readonly file: File;
  readonly path: string;
  private snap?: storage.UploadTaskSnapshot;
  private progressListener: (progress: number) => void = p => null;
  private finishListener: (snap: storage.UploadTaskSnapshot) => void = s =>
    null;
  private urlListener?: (url: string) => void;

  constructor(path: string, file: File) {
    this.path = path;
    this.file = file;
    this.filename = file.name;

    // Valor padrão do onFinish
    this.onFinish(snap => undefined);
  }

  onProgress(listener: (percent: number) => void) {
    this.progressListener = listener;
    return this;
  }

  onFinish(finish: (snap: storage.UploadTaskSnapshot) => void) {
    this.finishListener = snap => {
      finish(snap);
      snap.ref.getDownloadURL().then(this.urlListener);
    };

    return this;
  }

  onGetDownloadUrl(listener: (url: string) => void) {
    this.urlListener = listener;
    return this;
  }

  start(storageName?: string) {
    const path = (this.path + "/").replace("//", "/");

    storage()
      .ref(path + (storageName || this.filename))
      .put(this.file)
      .on(
        storage.TaskEvent.STATE_CHANGED,
        snap => {
          this.progressListener(snap.bytesTransferred / snap.totalBytes);
          this.snap = snap;
        },
        error => null,
        () => {
          this.finishListener(this?.snap as storage.UploadTaskSnapshot);
        }
      );

    return this;
  }
}
