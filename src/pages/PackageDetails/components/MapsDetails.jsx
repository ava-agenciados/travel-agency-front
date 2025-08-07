
const MapsDetails = ({ street, number, neighborhood, city, state, country, zipCode }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const addressParts = [street, number, neighborhood, city, state, country, zipCode].filter(Boolean);
  const address = addressParts.join(', ');
  const formattedAddress = encodeURIComponent(address);
  const mapaSrc = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${formattedAddress}`;
  return (
    <section>
      <div className="max-w-9xl mx-auto py-8">
        <h4 className="text-xl font-semibold mb-4">Localização da acomodação</h4>
        <div className="col-span-2 max-w-9xl">
          <iframe
            src={mapaSrc}
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapsDetails;