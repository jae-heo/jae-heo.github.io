export const translations = {
  en: {
    objective: 'Use joystick',
    attackButton: 'Throw',
    idle: 'Idle',
    moving: 'Moving',
    attacking: 'Attacking',
    blocked: 'Blocked',
    finished: 'Finished',
    dead: 'Dead',
    completedTitle: 'All crystals collected',
    deadTitle: 'You touched an enemy',
    deadDescription: 'The run ends immediately when an enemy catches you.',
    playAgain: 'Play again',
    worldNote: 'Move with the joystick and tap enemies to attack.',
    targetSet: 'Destination set to {{x}}, {{y}}.',
    meleeHit: 'You struck the enemy at close range.',
    stoneThrow: 'You threw a stone.',
    stoneHit: 'The stone hit the enemy.',
    stoneMiss: 'The stone missed.',
    enemyDodged: 'The enemy dodged the stone.',
    attackCoolingDown: 'You need to wait before throwing again.',
    attackBlocked: 'A wall blocks the throw.',
    tooFar: 'The enemy is too far away.',
    crystalPicked: 'You collected a crystal. {{count}} / {{total}}.',
    allCrystals: 'All crystals collected. Reset to play again.',
    collision: 'You bumped into a wall.',
    enemyTouch: 'An enemy touched you.',
    arrived: 'Destination reached.',
    dragHint: 'Use the joystick to move. Tap enemies to attack.'
  },
  ko: {
    objective: '조이스틱으로 이동',
    attackButton: '투척',
    idle: '대기 중',
    moving: '이동 중',
    attacking: '공격',
    blocked: '막힘',
    finished: '클리어',
    dead: '죽음',
    completedTitle: '모든 크리스탈을 모았습니다',
    deadTitle: '적에게 닿았습니다',
    deadDescription: '적과 닿는 순간 바로 게임이 끝납니다.',
    playAgain: '다시 하기',
    worldNote: '조이스틱으로 움직이고 적을 탭해 공격하세요.',
    targetSet: '목적지를 {{x}}, {{y}}로 설정했습니다.',
    meleeHit: '가까이서 적을 공격했습니다.',
    stoneThrow: '돌을 던졌습니다.',
    stoneHit: '돌이 적에게 맞았습니다.',
    stoneMiss: '돌이 빗나갔습니다.',
    enemyDodged: '적이 돌을 피했습니다.',
    attackCoolingDown: '다음 투척까지 잠깐 기다려야 합니다.',
    attackBlocked: '벽 때문에 공격이 막혔습니다.',
    tooFar: '적이 너무 멉니다.',
    crystalPicked: '크리스탈을 획득했습니다. {{count}} / {{total}}.',
    allCrystals: '모든 크리스탈을 모았습니다. 다시 하려면 리셋하세요.',
    collision: '벽에 부딪혔습니다.',
    enemyTouch: '적에게 닿았습니다.',
    arrived: '목적지에 도착했습니다.',
    dragHint: '조이스틱으로 이동하고 적을 탭해 공격하세요.'
  }
};

export function createTranslator(lang) {
  return function t(key, params = {}) {
    let value = translations[lang] || translations.en;
    for (const part of key.split('.')) value = value?.[part];
    if (typeof value !== 'string') return key;
    return value.replace(/{{(.*?)}}/g, (_, token) => params[token.trim()] ?? '');
  };
}
