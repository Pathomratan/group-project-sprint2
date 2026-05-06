import React, { useState } from 'react';

const DataRow = ({ rowId, imageUrl, data1, data2, data3, data4, onButton1, onButton2, onButton3 }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Image Section */}
        <div className="w-20 h-20 shrink-0">
          <img
            src={imageUrl || 'https://via.placeholder.com/80'}
            alt={`Row ${rowId} Image`}
            className="w-full h-full object-cover rounded border border-gray-300"
          />
        </div>
        {/* Data Section */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white border border-gray-300 rounded p-3 text-center text-sm font-medium">{data1 || 'Data 1'}</div>
          <div className="bg-white border border-gray-300 rounded p-3 text-center text-sm font-medium">{data2 || 'Data 2'}</div>
          <div className="bg-white border border-gray-300 rounded p-3 text-center text-sm font-medium">{data3 || 'Data 3'}</div>
          <div className="bg-white border border-gray-300 rounded p-3 text-center text-sm font-medium">{data4 || 'Data 4'}</div>
        </div>
        {/* Buttons Section */}
        <div className="flex gap-2 w-full md:w-auto">
          <button
            className="flex-1 md:flex-none bg-accent hover:bg-orange-700 text-neutral px-4 py-2 rounded font-semibold transition duration-300"
            onClick={onButton1}
          >
            Button 1
          </button>
          <button
            className="flex-1 md:flex-none bg-accent hover:bg-orange-700 text-neutral px-4 py-2 rounded font-semibold transition duration-300"
            onClick={onButton2}
          >
            Button 2
          </button>
          <button
            className="flex-1 md:flex-none bg-accent hover:bg-orange-700 text-neutral px-4 py-2 rounded font-semibold transition duration-300"
            onClick={onButton3}
          >
            Button 3
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-neutral shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-accent">
            LOGO
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-secondary transition duration-300">Home</Link></li>
            <li><Link to="/menu" className="hover:text-secondary transition duration-300">Menu</Link></li>
            <li><Link to="/order" className="hover:text-secondary transition duration-300">Order</Link></li>
            <li><Link to="#" className="hover:text-secondary transition duration-300">Contact</Link></li>
          </ul>
          <button className="bg-secondary hover:bg-accent text-neutral px-6 py-2 rounded-full font-semibold transition duration-300">
         <Link to="/login">Sign In</Link>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-primary border-t border-accent/20`}>
        <ul className="flex flex-col p-4 space-y-4">
          <li><Link to="/" className="block hover:text-secondary transition duration-300">Home</Link></li>
          <li><Link to="/menu" className="block hover:text-secondary transition duration-300">Menu</Link></li>
          <li><Link to="/order" className="block hover:text-secondary transition duration-300">Order</Link></li>
          <li><Link to="#" className="block hover:text-secondary transition duration-300">Contact</Link></li>
          <li>
            <button className="w-full bg-secondary hover:bg-accent text-neutral px-6 py-2 rounded-lg font-semibold transition duration-300">
              <Link to="/login">Sign In</Link>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

const Buttonmenu = () => {
  const [rows] = useState([
    { id: 1, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] },
    { id: 2, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] },
    { id: 3, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] },
    { id: 4, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] },
    { id: 5, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] },
    { id: 6, image: '', data: ['Data 1', 'Data 2', 'Data 3', 'Data 4'] }
  ]);

  const handleButton = (rowId, buttonNum) => {
    alert(`Row ${rowId} - Button ${buttonNum} clicked!`);
  };

  return (
    <div className="min-h-screen bg-neutral">
      <main className="p-4 md:p-8 lg:px-20 max-w-screen mx-auto mt-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Box (Empty) */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-300 shadow-sm min-h-96 p-4"></div>

          {/* Middle Box (Main Content) */}
          <div className="lg:col-span-10 bg-white rounded-lg border border-gray-300 shadow-sm p-6">
            <div className="space-y-4">
              {rows.map((row) => (
                <DataRow
                  key={row.id}
                  rowId={row.id}
                  imageUrl={row.image}
                  data1={row.data[0]}
                  data2={row.data[1]}
                  data3={row.data[2]}
                  data4={row.data[3]}
                  onButton1={() => handleButton(row.id, 1)}
                  onButton2={() => handleButton(row.id, 2)}
                  onButton3={() => handleButton(row.id, 3)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Buttonmenu;