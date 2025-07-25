import { useState } from 'react'

/**
 * Componente reutilizável para campo de senha com toggle de visibilidade
 * @param {Object} props - Propriedades do componente
 * @param {string} props.label - Label do campo (ex: "SENHA", "NOVA SENHA")
 * @param {string} props.name - Nome do input para o formulário
 * @param {string} props.value - Valor atual do campo
 * @param {function} props.onChange - Função callback para mudanças no input
 * @param {string} props.placeholder - Placeholder do input
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.id - ID do input
 */
const PasswordField = ({ 
  label = "SENHA", 
  name = "password", 
  value = "", 
  onChange, 
  placeholder = "", 
  required = true,
  id = "password"
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
        {label}
      </legend>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0 pr-10"
          style={{ fontFamily: 'Inter, sans-serif' }}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-opacity-60 hover:text-opacity-100 focus:outline-none transition-opacity duration-200"
          style={{ padding: '4px' }}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            // Ícone de olho cortado (senha visível)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          ) : (
            // Ícone de olho normal (senha oculta)
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </button>
      </div>
    </fieldset>
  )
}

export default PasswordField
