// src/DemoComponent.tsx
import React from 'react';

interface DemoComponentProps {
  name: string;
}

const DemoComponent: React.FC<DemoComponentProps> = ({ name }) => {
  return (
    <div style={{ padding: '1rem', background: '#f7fbff', borderRadius: '8px', color: '#1976d2' }}>
      <h2>Hello, {name}!</h2>
      <p>This is a sample React component written in TypeScript (.tsx).</p>
    </div>
  );
};

export default DemoComponent; 