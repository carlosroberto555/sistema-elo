interface Caso {
  resp: string;
  numero: number;
  tipo: string;
  nome: string;
  status: number;
  descricao: string;
  usuario: DocumentReference;
  retorno: string;
  valor: number;
  uid: string;
  docs: Array;
}
interface Consultas {
  title: string;
  start: string;
  end: string;
}
interface Clientes {
  avatar: string;
  display_name: string;
  dt_nascimento: string;
  email: string;
  nome: string;
  telefone: string;
  cpf: string;
  endereco: string;
  complemento: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  uid: string;
}

interface Usuarios {
  avatar: string;
  matricula: string;
  endereco: string;
  bairro: string;
  numero: number;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  estado: string;
  nome: string;
  numero: string;
  telefone: string;
  contrato: string;
  funcao: string;
  email: string;
  emailpro: string;
  localqg: string;
  infoextra: string;
  nascimento: Date;
  acesso: string;
  uid: string;
}

interface Chat {
  name: string;
}

interface Post {
  nome: string;
  uid: string;
  text: string;
  avatar: string;
  date: import("firebase").firestore.Timestamp;
  docs: Array;
}

type ChatItem = Chat & FirestoreItem;
type CasoItem = Caso & FirestoreItem;
type PostItem = Post & FirestoreItem;

type FirestoreItem<T = any> = (T & { key: string }) | undefined;
type FirestoreItems<T> = FirestoreItem<T>[];

// Firebase Auth Types
type User = FirebaseAuthTypes.User;

// Firebase Firestore Types
type QuerySnapshot = import("firebase").firestore.QuerySnapshot;
type DocumentSnapshot = import("firebase").firestore.DocumentSnapshot;
type DocumentReference = import("firebase").firestore.DocumentReference;
type CollectionReference = import("firebase").firestore.CollectionReference;
