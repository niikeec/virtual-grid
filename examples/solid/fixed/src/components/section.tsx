import { ParentProps } from 'solid-js';

export const Section = ({ name, children }: ParentProps<{ name: string }>) => {
  return (
    <section style={{ padding: '12px' }}>
      <h2>{name}</h2>
      <div
        style={{
          display: 'grid',
          'grid-template-columns': '1fr 1fr',
          gap: '4px',
          width: '100%'
        }}
      >
        {children}
      </div>
    </section>
  );
};
