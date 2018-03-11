module.exports = bet => ({
  home_bet: bet.includes('1'),
  draw_bet: bet.includes('X') || bet.includes('x') || bet.includes('N') || bet.includes('n'),
  away_bet: bet.includes('2'),
});
