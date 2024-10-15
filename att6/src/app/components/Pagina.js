"use client";

import { Container } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      <header className="bg-dark text-white text-center py-4">
        <h2>{titulo}</h2>
      </header>

      <Container className="my-3">
        {children}
      </Container>
    </>
  );
}
