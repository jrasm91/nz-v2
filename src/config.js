export default {
  gameWidth: 800,
  gameHeight: 800,
  localStorageName: 'nz-v2',
  player: {
    WALK_SPEED: 200,
    healthbar: {
      width: 200,
      height: 25
    }
  },
  enemy: {
    WALK_SPEED: 100
  },
  animations: {
    WALK_SPEED: 15,
    actions: [
      { name: 'spellcast:up', frameCount: 7 },
      { name: 'spellcast:left', frameCount: 7 },
      { name: 'spellcast:down', frameCount: 7 },
      { name: 'spellcast:right', frameCount: 7 },
      { name: 'thrust:up', frameCount: 8 },
      { name: 'thrust:left', frameCount: 8 },
      { name: 'thrust:down', frameCount: 8 },
      { name: 'thrust:right', frameCount: 8 },
      { name: 'walk:up', frameCount: 9 },
      { name: 'walk:left', frameCount: 9 },
      { name: 'walk:down', frameCount: 9 },
      { name: 'walk:right', frameCount: 9 },
      { name: 'slash:up', frameCount: 6 },
      { name: 'slash:left', frameCount: 6 },
      { name: 'slash:down', frameCount: 6 },
      { name: 'slash:right', frameCount: 6 },
      { name: 'shoot:up', frameCount: 13 },
      { name: 'shoot:left', frameCount: 13 },
      { name: 'shoot:down', frameCount: 13 },
      { name: 'shoot:right', frameCount: 13 },
      { name: 'hurt', frameCount: 4 }
    ]
  }
}