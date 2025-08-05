const Footer = () => {
  return (
    <footer className="bg-[#15233A] text-white px-6 py-10 items-center">
      <div className="max-w-9xl mx-auto gap-8 flex justify-center items-center">
        <div className="space-y-4">
          <h2 className="text-xl font-bold italic">New Horizons</h2>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded">
              {/* icon */}
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded">
              {/* icon */}
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded">
              {/* icon */}
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-9xl mx-auto">
      <div className="border-t border-gray-600 mt-10 pt-4 flex md:flex-row justify-center items-center text-xs text-gray-300">
        <p>© 2025 Todos os direitos reservados</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
