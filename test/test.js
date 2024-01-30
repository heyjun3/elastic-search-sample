import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
}

export default function () {
  let res = http.get('http://localhost:3000/cats');

  check(res, {'status was 200': (r) => r.status == 200})
  sleep(1);
}
