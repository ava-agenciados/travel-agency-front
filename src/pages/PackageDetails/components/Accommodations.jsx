import Image from "../../../assets/image";

export default function Accommodations({ lodgingInfo, showLabels = true }) {
  const icons = {
    baths: {
      icon: (
        <abbr title="Banheiros">

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M5 10V7a4 4 0 018 0v3m-6 4v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>
        </abbr>
      ),
      label: 'Banheiros'
    },
    // carro, cama, restaurante, cafe, academia
    beds: {
      icon: (
        <abbr title="Camas">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10m0-6h18v6M7 10h.01M17 10h.01" />
          </svg>
        </abbr>
      ),
      label: 'Camas'
    },
    wifiIncluded: {
      icon: (
        <abbr title="Wi-Fi">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 16.5a3.5 3.5 0 017 0m-10-4a8 8 0 0113.9 0m-16.6-4a12 12 0 0120.2 0" /></svg>
        </abbr>
      ),
      label: 'Wi-Fi'
    },
    parkingSpot: {
      icon: (
        <abbr title="Estacionamento">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h4a2 2 0 100-4H8v8" /></svg>
        </abbr>
      ),
      label: 'Estacionamento'
    },
    swimmingPool: {
      icon: (
        <abbr title="Piscina">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 18c1.5-1 4.5-1 6 0s4.5 1 6 0 4.5-1 6 0" /></svg>
        </abbr>
      ),
      label: 'Piscina'
    },
    fitnessCenter: {
      icon: (
        <abbr title="Academia">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h2v4H3v-4zm16 0h2v4h-2v-4zM6 9h2v6H6V9zm10 0h2v6h-2V9zM9 11h6v2H9v-2z" />
          </svg>
        </abbr>
      ),
      label: 'Academia'
    },
    restaurantOnSite: {
      icon: (
        <abbr title="Restaurante">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 3v7a2 2 0 002 2v9m6-18v7a2 2 0 002 2v9m6-18v7a2 2 0 01-2 2v9" />
          </svg>
        </abbr>
      ),
      label: 'Restaurante'
    },
    petAllowed: {
      icon: (
        <abbr title="Pet Friendly">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12a4 4 0 014 4v2a4 4 0 01-8 0v-2a4 4 0 014-4z" /></svg>
        </abbr>
      ),
      label: 'Pet Friendly'
    },
    airConditioned: {
      icon: (
        <abbr title="Ar-condicionado">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="2" strokeWidth="1.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17v2m10-2v2" /></svg>
        </abbr>
      ),
      label: 'Ar-condicionado'
    },
    breakfast: {
      icon: (
        <abbr title="Café da manhã">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 010 4h-2M4 6h13v6a6 6 0 01-6 6H8a6 6 0 01-6-6V6z" />
          </svg>
        </abbr>
      ),
      label: 'Café da manhã'
    },
  };
  const info = lodgingInfo || {};
  const filtered = Object.entries(icons).filter(([key]) => {
    if ((key === 'beds' || key === 'baths')) {
      const val = info[key];
      return (typeof val === 'number' && val > 0) || (!isNaN(Number(val)) && Number(val) > 0);
    }
    return info[key] === true;
  });
  if (filtered.length === 0) return null;
  return (
    <div>
      {showLabels && (
        <h3 className="text-lg font-semibold mb-4">Acomodações que o pacote inclui</h3>
      )}
      <div
        className={
          showLabels

            ? 'grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700'
            : 'flex flex-row flex-wrap gap-1 items-center'
        }
      >
        <span className="flex items-center gap-2">
          <abbr title="Acompanhantes">
            <img width={24} src={Image.IconPeople} alt="Acompanhantes" />
          </abbr>
          <label className="truncate"> 3</label>
        </span>
        {filtered.map(([key, { icon, label }]) => {
          if ((key === 'beds' || key === 'baths')) {
            const val = info[key];
            if ((typeof val === 'number' && val > 0) || (!isNaN(Number(val)) && Number(val) > 0)) {
              return (
                <div key={key} className={showLabels ? 'flex items-center gap-2' : ''}>
                  {icon}
                  {showLabels && <span>{label}: {val}</span>}
                </div>
              );
            }
          }
          if (key !== 'beds' && key !== 'baths' && info[key] === true) {
            return (
              <div key={key} className={showLabels ? 'flex items-center gap-2' : ''}>
                {icon}
                {showLabels && <span>{label}</span>}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}