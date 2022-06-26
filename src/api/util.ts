import { Query, getDocs } from "firebase/firestore";

export async function executeQuery(q: Query) {
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return docs;
}
