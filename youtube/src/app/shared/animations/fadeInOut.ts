import { animate, state, style, transition, trigger } from '@angular/animations';

const fadeInOut = trigger('fadeInOut', [
  state('in', style([{ transform: 'translateY(0)' }, { opacity: 1 }])),
  state('out', style([{ transform: 'translateY(-2.5rem)' }, { opacity: 0 }])),
  transition('in <=> out', [animate('0.5s ease-in-out')]),
]);

export default fadeInOut;
