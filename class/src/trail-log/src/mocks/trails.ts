import { ApiTrail } from '../app/trails/types';
import { delay, http, HttpResponse } from 'msw';

const FAKE_TRAILS = [
  {
    id: '000-0000-0000-22',
    name: 'Woody Woodpecker Way Loop',
    miles: 1.8,
    difficulty: 'easy',
  },
  {
    id: '2',
    name: 'Eagle Rock Trail',
    miles: 3.2,
    difficulty: 'moderate',
  },
  {
    id: '3',
    name: 'Bear Creek Trail',
    miles: 2.5,
    difficulty: 'hard',
  },
  {
    id: '5',
    name: 'Cedar Ridge Trail',
    miles: 4.1,
    difficulty: 'extreme',
  },
  {
    id: '6',
    name: 'Pine Valley Trail',
    miles: 5.0,
    difficulty: 'moderate',
  },
  {
    id: '7',
    name: 'Pine Valley Trail',
    miles: 5.0,
    difficulty: 'really-super-hard',
  },
];

export const trailsHandler = [
  http.get('http://localhost:1337/trails', async () => {
    await delay();
    return HttpResponse.json(FAKE_TRAILS);
  }),
];
