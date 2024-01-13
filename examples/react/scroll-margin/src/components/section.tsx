import { PropsWithChildren } from 'react';

export const Section = ({
  name,
  children
}: PropsWithChildren<{ name: string }>) => {
  return (
    <div style={{ padding: 12 }}>
      <h2>{name}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          width: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};
