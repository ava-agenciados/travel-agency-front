
const MapsDetails = ({ zipcode }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const mapaSrc = `https://www.google.com/maps/embed/v1/search?key=${API_KEY}&q=${encodeURIComponent(zipcode)}`;
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
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapsDetails;