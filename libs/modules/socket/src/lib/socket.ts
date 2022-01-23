/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import EventEmitter from 'events';

export interface Socket extends EventEmitter {
  id: string;
}
