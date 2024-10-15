'use client'

import { useState } from "react";
import { Button, Form, Modal, CardImg } from "react-bootstrap";
import { FaCheck, FaUndo } from "react-icons/fa";
import Pagina from "./components/Pagina";

export default function ConversorMoedas() {

  const [valorReais, setValorReais] = useState('');
  const [moedaSelecionada, setMoedaSelecionada] = useState('');
  const [valorConvertido, setValorConvertido] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const taxasConversao = {
    dolar: 0.20,
    euro: 0.18,
    bitcoin: 0.000003
  };

  const imagensMoedas = {
    dolar: "/Atividade6-Front-End/att6/src/app/moedas/dollar.jpeg",
    euro: "/Atividade6-Front-End/att6/src/app/moedas/euro.jpeg",
    bitcoin: "/Atividade6-Front-End/att6/src/app/moedas/bitcoin.jpeg"
  };

  function converter(event) {
    event.preventDefault();

    const valorNumerico = parseFloat(valorReais);
    let resultado = 0;

    switch (moedaSelecionada) {
      case 'dolar':
        resultado = (valorNumerico * taxasConversao.dolar).toFixed(2);
        break;
      case 'euro':
        resultado = (valorNumerico * taxasConversao.euro).toFixed(2);
        break;
      case 'bitcoin':
        resultado = (valorNumerico * taxasConversao.bitcoin).toFixed(6);
        break;
      default:
        resultado = 0;
        break;
    }

    setValorConvertido(resultado);
    setShowModal(true);
  }

  function limpar() {
    setValorReais('');
    setMoedaSelecionada('');
    setValorConvertido(null);
  }

  return (
    <Pagina titulo="Conversor de Moedas">
      <Form onSubmit={converter}>
        <Form.Group className="mb-3">
          <Form.Label>Valor em Reais (R$):</Form.Label>
          <Form.Control
            type="number"
            value={valorReais}
            onChange={e => setValorReais(e.target.value)}
            required
            min={0}
            step={0.01}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Escolha a Moeda:</Form.Label>
          <Form.Select
            value={moedaSelecionada}
            onChange={e => setMoedaSelecionada(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="dolar">Dólar</option>
            <option value="euro">Euro</option>
            <option value="bitcoin">Bitcoin</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" variant="success" className="me-2">
            <FaCheck /> Converter
          </Button>
          <Button variant="warning" onClick={limpar}>
            <FaUndo /> Limpar
          </Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado da Conversão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {valorConvertido !== null ? (
            <div className="text-center">
              <p>
                O valor convertido em {moedaSelecionada === 'dolar' ? 'Dólar' : moedaSelecionada === 'euro' ? 'Euro' : 'Bitcoin'} é {valorConvertido}.
              </p>
              <CardImg 
                src={imagensMoedas[moedaSelecionada]} 
                alt={moedaSelecionada} 
                style={{ width: '100px' }}
              />
            </div>
          ) : (
            <p>Nenhum valor convertido.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </Pagina>
  );
}
