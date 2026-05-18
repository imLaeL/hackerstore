export interface Product {
  id: string;                // O UUID do Java vira string aqui
  name: string;
  descricao: string;
  "img-url": string;         // Deve ser entre aspas por causa do hífen
  creationTimeStamp: string; // Instants do Java chegam como strings ISO (ex: 2023-10-27T...)
  updateTimeStamp: string;
}