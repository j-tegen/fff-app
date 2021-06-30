import { EDirection } from '@/enums/direction.enum';
import { ObjectTileType } from '@/enums/object-tile-type.enums';
import { EPlayerColour } from '@/enums/player-colour.enum';

export const objectTileSprites: { [key: string]: any } = {
  [ObjectTileType.SPIKES]: {
    f0: require('../assets/sprites/objects/floor_spikes_f0.png'),
    f1: require('../assets/sprites/objects/floor_spikes_f1.png'),
    f2: require('../assets/sprites/objects/floor_spikes_f2.png'),
    f3: require('../assets/sprites/objects/floor_spikes_f3.png'),
  },
  [ObjectTileType.HOLE]: {
    f0: require('../assets/sprites/objects/hole.png'),
  },
  [ObjectTileType.CRATE]: {
    f0: require('../assets/sprites/objects/crate.png'),
  },
};

export const playerSprites: { [key: string]: any } = {
  [EPlayerColour.RED]: {
    [EDirection.RIGHT]: {
      f0: require('../assets/sprites/characters/RED_RIGHT_F0.png'),
      f1: require('../assets/sprites/characters/RED_RIGHT_F1.png'),
      f2: require('../assets/sprites/characters/RED_RIGHT_F2.png'),
      f3: require('../assets/sprites/characters/RED_RIGHT_F3.png'),
    },
    [EDirection.LEFT]: {
      f0: require('../assets/sprites/characters/RED_LEFT_F0.png'),
      f1: require('../assets/sprites/characters/RED_LEFT_F1.png'),
      f2: require('../assets/sprites/characters/RED_LEFT_F2.png'),
      f3: require('../assets/sprites/characters/RED_LEFT_F3.png'),
    },
  },
  [EPlayerColour.BLUE]: {
    [EDirection.RIGHT]: {
      f0: require('../assets/sprites/characters/BLUE_RIGHT_F0.png'),
      f1: require('../assets/sprites/characters/BLUE_RIGHT_F1.png'),
      f2: require('../assets/sprites/characters/BLUE_RIGHT_F2.png'),
      f3: require('../assets/sprites/characters/BLUE_RIGHT_F3.png'),
    },
    [EDirection.LEFT]: {
      f0: require('../assets/sprites/characters/BLUE_LEFT_F0.png'),
      f1: require('../assets/sprites/characters/BLUE_LEFT_F1.png'),
      f2: require('../assets/sprites/characters/BLUE_LEFT_F2.png'),
      f3: require('../assets/sprites/characters/BLUE_LEFT_F3.png'),
    },
  },
  [EPlayerColour.YELLOW]: {
    [EDirection.RIGHT]: {
      f0: require('../assets/sprites/characters/YELLOW_RIGHT_F0.png'),
      f1: require('../assets/sprites/characters/YELLOW_RIGHT_F1.png'),
      f2: require('../assets/sprites/characters/YELLOW_RIGHT_F2.png'),
      f3: require('../assets/sprites/characters/YELLOW_RIGHT_F3.png'),
    },
    [EDirection.LEFT]: {
      f0: require('../assets/sprites/characters/YELLOW_LEFT_F0.png'),
      f1: require('../assets/sprites/characters/YELLOW_LEFT_F1.png'),
      f2: require('../assets/sprites/characters/YELLOW_LEFT_F2.png'),
      f3: require('../assets/sprites/characters/YELLOW_LEFT_F3.png'),
    },
  },
  [EPlayerColour.GREEN]: {
    [EDirection.RIGHT]: {
      f0: require('../assets/sprites/characters/GREEN_RIGHT_F0.png'),
      f1: require('../assets/sprites/characters/GREEN_RIGHT_F1.png'),
      f2: require('../assets/sprites/characters/GREEN_RIGHT_F2.png'),
      f3: require('../assets/sprites/characters/GREEN_RIGHT_F3.png'),
    },
    [EDirection.LEFT]: {
      f0: require('../assets/sprites/characters/GREEN_LEFT_F0.png'),
      f1: require('../assets/sprites/characters/GREEN_LEFT_F1.png'),
      f2: require('../assets/sprites/characters/GREEN_LEFT_F2.png'),
      f3: require('../assets/sprites/characters/GREEN_LEFT_F3.png'),
    },
  },
  dead: require('../assets/sprites/characters/skull.png'),
};

export const arrowSprites: { [key: string]: string } = {
  [EDirection.RIGHT]: require('../assets/sprites/objects/arrow_RIGHT.png'),
  [EDirection.LEFT]: require('../assets/sprites/objects/arrow_LEFT.png'),
  [EDirection.UP]: require('../assets/sprites/objects/arrow_UP.png'),
  [EDirection.DOWN]: require('../assets/sprites/objects/arrow_DOWN.png'),
};
