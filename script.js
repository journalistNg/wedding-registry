console.log('Script version: 2'); // Change this number each time
const { useState } = React;

const GiftCard = ({ gift, onClaim, onUnclaim, guestName }) => {
  return (
    <div className={`card bg-white rounded-lg overflow-hidden ${gift.claimed ? 'opacity-75' : ''}`}>
      <div className="relative">
        <img 
          src={gift.image} 
          alt={gift.name} 
          className="w-full h-48 object-cover"
        />
        {gift.claimed && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white px-3 py-1 rounded-full text-sm font-medium">
              Claimed by {gift.claimedBy}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-1">{gift.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{gift.description}</p>
        <p className="text-lg font-semibold mb-4">${gift.price}</p>
        
        <div className="flex justify-between items-center">
          <a 
            href={gift.link} 
            target="_blank" 
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            View Item
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          
          {!gift.claimed ? (
            <button
              onClick={() => onClaim(gift.id)}
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Claim
            </button>
          ) : (
            gift.claimedBy === guestName && (
              <button
                onClick={() => onUnclaim(gift.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Unclaim
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const WeddingRegistry = () => {
  // Initial gift list with images - replace with your actual gift items
  const initialGifts = [
    {
      id: 1,
      name: "Refrigerator",
      price: "RM1,789.00",
      link: "https://shopee.com.my/Toshiba-GR-RT468WE-PMY(06)-400L-2-Doors-Inverter-Refrigerator-Freezer-Fridge-Peti-Sejuk-i.280909231.8327598783",
      image: "https://down-my.img.susercontent.com/file/d0aa82021d4ce1bf758f3b799dee213c.webp",
      description: "Refrigerator",
      claimed: false,
      claimedBy: ""
    },
    {
      id: 2,
      name: "Washing Machine",
      price: "RM1,184.00",
      link: "https://shopee.com.my/Toshiba-AW-M801AM(WW)-7.0-KG-Top-Load-Washing-Machine-(White)-i.280909231.25980708107",
      image: "https://down-my.img.susercontent.com/file/my-11134207-7r98y-lvbbpehaj98cec.webp",
      description: "Washing Machine",
      claimed: false,
      claimedBy: ""
    },
    {
      id: 3,
      name: "Blender",
      price: "RM107.00",
      link: "https://shopee.com.my/Toshiba-BL-60PHNMY-1.5L-Table-Blender-Blender-(600W)-i.280909231.3542476064",
      image: "https://down-my.img.susercontent.com/file/7cba3130fe2a289d7f5065d1177a79ce.webp",
      description: "Blender",
      claimed: false,
      claimedBy: ""
    },
    {
  id: 4, // Use the next available ID number
  name: "Toshiba Table Blender",
  price: "159.00", // Current price from Shopee (you may need to update this)
  link: "https://shopee.com.my/Toshiba-BL-60PHNMY-1.5L-Table-Blender-Blender-(600W)-i.280909231.3542476064",
  image: "https://down-my.img.susercontent.com/file/7cba3130fe2a289d7f5065d1177a79ce.webp",
  description: "Toshiba BL-60PHNMY 1.5L Table Blender (600W)",
  claimed: false,
  claimedBy: ""
    },
  ];

  const [gifts, setGifts] = useState(initialGifts);
  const [guestName, setGuestName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleClaim = (id) => {
    if (!guestName.trim()) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    setGifts(gifts.map(gift => 
      gift.id === id ? { ...gift, claimed: true, claimedBy: guestName } : gift
    ));
    // Save to localStorage
    localStorage.setItem('weddingRegistry', JSON.stringify(
      gifts.map(gift => gift.id === id ? { ...gift, claimed: true, claimedBy: guestName } : gift)
    ));
  };

  const handleUnclaim = (id) => {
    setGifts(gifts.map(gift =>
      gift.id === id ? { ...gift, claimed: false, claimedBy: "" } : gift
    ));
    // Save to localStorage
    localStorage.setItem('weddingRegistry', JSON.stringify(
      gifts.map(gift => gift.id === id ? { ...gift, claimed: false, claimedBy: "" } : gift)
    ));
  };

  // Load saved state from localStorage on initial render
  React.useEffect(() => {
    const savedRegistry = localStorage.getItem('weddingRegistry');
    if (savedRegistry) {
      setGifts(JSON.parse(savedRegistry));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
        <div className="p-6 text-center border-b">
          <h1 className="text-3xl font-bold text-gray-800">Our Wedding Registry</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border rounded-lg"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          
          {showAlert && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>Please enter your name before claiming a gift</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map(gift => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                onClaim={handleClaim} 
                onUnclaim={handleUnclaim} 
                guestName={guestName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<WeddingRegistry />, document.getElementById('root'));
