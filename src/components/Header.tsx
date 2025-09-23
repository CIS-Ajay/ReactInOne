import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border p-4">
        <h2 className="text-2xl text-primary">App Header</h2>
        <p className="text-muted">This text is muted.</p>
    </header>
  );
};

export default Header;