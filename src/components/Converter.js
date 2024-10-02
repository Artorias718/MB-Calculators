import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';

const Converter = () => {
  const [quotaPunta, setQuotaPunta] = useState('');
  const [quotaBanca, setQuotaBanca] = useState('');
  const [inputSource, setInputSource] = useState(''); // Per evitare cicli infiniti

  // Funzione per convertire quota di punta in quota di banca
  const convertiQuotaBanca = (quota) => {
    return (quota / (quota - 1)).toFixed(2); // Arrotonda a 2 decimali
  };

  // Funzione per convertire quota di banca in quota di punta
  const convertiQuotaPunta = (quota) => {
    return (quota / (quota - 1)).toFixed(2); // Arrotonda a 2 decimali
  };

  useEffect(() => {
    if (inputSource === 'punta' && quotaPunta && !isNaN(quotaPunta) && quotaPunta > 1) {
      const banca = convertiQuotaBanca(parseFloat(quotaPunta));
      setQuotaBanca(banca);
    } else if (inputSource === 'banca' && quotaBanca && !isNaN(quotaBanca) && quotaBanca > 1) {
      const punta = convertiQuotaPunta(parseFloat(quotaBanca));
      setQuotaPunta(punta);
    } else {
      if (inputSource === 'punta') setQuotaBanca('');
      if (inputSource === 'banca') setQuotaPunta('');
    }
  }, [quotaPunta, quotaBanca, inputSource]);

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h3 className="mb-3 text-light bg-dark p-3">Converter</h3>

      <Form>
        {/* Riquadri delle quote affiancati */}
        <Row className="mb-4">
          {/* Riquadro Quota di Punta */}
          <Col md={6}>
            <div className="p-3" style={{ backgroundColor: '#75c2fd', borderRadius: '8px' }}>
              <Form.Group>
                <Form.Label>Book Odds</Form.Label>
                <Form.Control
                  type="number"
                  value={quotaPunta}
                  onChange={(e) => {
                    setInputSource('punta');
                    setQuotaPunta(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </Col>
          {/* Riquadro Quota di Banca */}
          <Col md={6}>
            <div className="p-3" style={{ backgroundColor: '#fac9d1', borderRadius: '8px' }}>
              <Form.Group>
                <Form.Label>Exchange Odds</Form.Label>
                <Form.Control
                  type="number"
                  value={quotaBanca}
                  onChange={(e) => {
                    setInputSource('banca');
                    setQuotaBanca(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* Messaggi di errore */}
        {quotaPunta && quotaPunta <= 1 && inputSource === 'punta' && (
          <Alert variant="danger">
            La quota di punta deve essere maggiore di 1!
          </Alert>
        )}
        {quotaBanca && quotaBanca <= 1 && inputSource === 'banca' && (
          <Alert variant="danger">
            La quota di banca deve essere maggiore di 1!
          </Alert>
        )}
      </Form>

    </div>
  );
};

export default Converter;
