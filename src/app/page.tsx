"use client";

import Image from "next/image";
import library from "../books.json";
import { SetStateAction, useMemo, useState } from "react";

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: { name: string; otherBooks: string[] };
}

type BooksSowProps = {
  book: Book;
};

export default function Home() {
  // Estados
  const [genre, setGenre] = useState("");
  const [lista, setLista] = useState<Book[]>([]);
  const [titleBook, setTitleBook] = useState("");

  // Filtrar por género
  const matches: { book: Book }[] = useMemo(() => {
    return Object.values(library.library)
      .map((item) => ({ book: item.book }))
      .filter(({ book }) => {
        if (!genre || genre === "Todos") {
          return true;
        }
        return book.genre === genre;
      });
  }, [genre]);

  // Filtrar por nombre del libro
  const books = useMemo(
    () =>
      matches.filter(
        (item) =>
          item.book.title.toLowerCase().includes(titleBook) ||
          item.book.author.name.toLowerCase().includes(titleBook)
      ),
    [matches, titleBook]
  );

  // Añadir a la lista de lectura
  function handleAddList(book: Book) {
    if (!lista.includes(book)) {
      setLista((lista) => lista.concat(book));
    } else {
      alert("Ya está en la lista");
    }
  }

  // Eliminar de la lista de lectura
  function handleRemoveList(book: Book) {
    if (lista.includes(book)) {
      setLista((lista) => lista.filter((item) => item !== book));
    }
  }

  // Mostrar libros por género
  const BooksShow = ({ book }: BooksSowProps) => {
    return (
      <li
        key={book.ISBN}
        className="mb-5 cursor-pointer"
        onClick={() => handleAddList(book)}
      >
        <Image
          className="aspect-[9/14] object-cover"
          src={book.cover}
          alt={book.title}
          width={200}
          height={300}
        />
        <p className="truncate">Título: {book.title}</p>
      </li>
    );
  };

  // Evitar la repetición de géneros en el select de género
  const GenerosUnicos = ({
    onGenreChange,
  }: {
    onGenreChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }) => {
    const todosGeneros = Object.values(library.library).map(
      (item) => item.book.genre
    );
    const generosUnicos = Array.from(new Set(todosGeneros));

    return (
      <select onChange={onGenreChange}>
        {generosUnicos.map((genre) => (
          <option key={genre}>{genre}</option>
        ))}
      </select>
    );
  };

  const handleGenreSelection = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setGenre(e.target.value);
  };

  const handleGenreDeletion = (e: any) => {
    setGenre("Todos");
  };

  return (
    <>
      <nav className="mb-2">
        <input
          type="text"
          className="py-2 pl-2"
          value={titleBook}
          onChange={(e) => setTitleBook(e.target.value)}
          placeholder="Buscar libro..."
        />
      </nav>
      <div className="flex gap-10 mb-5">
        <div className="flex gap-2">
          <label>Filtrar por páginas</label>
          <select>
            <option value="0-100">0-100</option>
            <option value="200-400">200-400</option>
            <option value="400-800">400-800</option>
            <option value="1000">+1000</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label>Filtrar por género</label>
          <GenerosUnicos onGenreChange={handleGenreSelection} />
          <button onClick={handleGenreDeletion}>Resetear Selección</button>
        </div>
      </div>

      <div className="p-5 mb-5 border">
        <h3>Lista de lectura</h3>
        <span>({lista.length}) libros en la lista</span>
        <ul className="flex flex-wrap items-center gap-5 mt-2">
          {lista.map((book) => (
            <li
              key={book.ISBN}
              className="cursor-pointer"
              onClick={() => handleRemoveList(book)}
            >
              <Image
                className="aspect-[9/14] object-cover"
                src={book.cover}
                alt={book.title}
                width={200}
                height={300}
              ></Image>
            </li>
          ))}
        </ul>
      </div>

      <h3>Libros disponibles</h3>
      <span>({books.length}) libros disponibles</span>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] mt-2">
        {books.map(({ book }) => (
          <BooksShow key={book.ISBN} book={book} />
        ))}
      </ul>
    </>
  );
}
