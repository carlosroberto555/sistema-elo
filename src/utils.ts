import { useState, useEffect, createContext } from "react";
import { firestore, User } from "firebase/app";

type FormatFunction<T> = (s: DocumentSnapshot) => T;
type FirestoreItemReturn<T> = [
  FirestoreItem<T>,
  DocumentSnapshot | undefined,
  boolean
];

type FormatListFunction<T> = (s: firestore.QueryDocumentSnapshot) => T;
type FormatItemFunction<T> = (s: firestore.DocumentSnapshot) => T;
type AuthContextProps = {
  isAuthenticated: boolean;
  authLoading: boolean;
  user?: User;
};

type Options<T> = {
  formatDoc?: FormatFunction<T>;
  collection?: (ref: CollectionReference) => firestore.Query;
  initial?: FirestoreItem<T> | (() => FirestoreItem<T>);
};

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  authLoading: true
});

export function useFirestore<T>(
  collection: string,
  formatDoc: FormatListFunction<T> = doc => doc.data() as T
) {
  const [items, setItems] = useState<(T & { key: string })[]>([]);

  useEffect(() => {
    return firestore()
      .collection(collection)
      .onSnapshot(snap => {
        const docs = snap.docs.map(doc => ({
          ...formatDoc(doc),
          key: doc.id
        }));
        setItems(docs);
      });
  }, [collection]);

  return [items];
}

export function useFirestoreDoc<T>(
  collection: string,
  key: string,
  options?: Pick<Options<T>, "formatDoc" | "initial">
): FirestoreItemReturn<T> {
  const formatDoc = (options && options.formatDoc) || (doc => doc.data() as T);
  const [loading, setLoading] = useState(false);
  const [snap, setSnap] = useState<DocumentSnapshot>();
  const [item, setItem] = useState<FirestoreItem<T>>(options?.initial);

  useEffect(() => {
    if (key) {
      return firestore()
        .collection(collection)
        .doc(key)
        .onSnapshot(snap => {
          setLoading(false);
          setSnap(snap);
          setItem({ ...formatDoc(snap), key: snap.id });
        });
    }
  }, [collection, key]);

  return [item, snap, loading];
}

export function useFirestoreSubCollection<T>(
  collection: string,
  key: string,
  subcollection: string,
  formatDoc: FormatItemFunction<T> = doc => doc.data() as T
) {
  const [items, setItems] = useState<(T & { key: string })[]>([]);

  useEffect(() => {
    return firestore()
      .collection(collection)
      .doc(key)
      .collection(subcollection)
      .onSnapshot(snap => {
        const docs = snap.docs.map(doc => ({
          ...formatDoc(doc),
          key: doc.id
        }));
        setItems(docs);
      });
  }, [collection, key, subcollection]);

  return [items];
}

export function useFirestoreRef<T>(
  ref: DocumentReference | undefined,
  options?: Options<T>
) {
  const format = (options && options.formatDoc) || (doc => doc.data() as T);
  const [doc, setDoc] = useState<FirestoreItem<T>>(options?.initial);

  useEffect(() => {
    return ref?.onSnapshot((snap: DocumentSnapshot) => {
      setDoc({ ...format(snap), key: snap.id });
    });
  }, [ref]);

  return [doc];
}
