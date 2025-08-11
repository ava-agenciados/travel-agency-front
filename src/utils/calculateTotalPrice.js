// Função utilitária para cálculo do valor total do pacote considerando acompanhantes e desconto PIX
// price: valor base do pacote
// companionsCount: número de acompanhantes (0, 1 ou 2)
// paymentMethod: 'pix' ou outro
export function calculateTotalPrice(price, companionsCount = 0, paymentMethod = '') {
  let total = Number(price) || 0;
  for (let i = 0; i < companionsCount; i++) {
    total += total * 0.3;
  }
  if (paymentMethod === 'pix') {
    total *= 0.95;
  }
  return total;
}
