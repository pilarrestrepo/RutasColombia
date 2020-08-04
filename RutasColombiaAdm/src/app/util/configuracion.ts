import { HttpHeaders } from '@angular/common/http';

export var configuracionServicio = {
    "DominioServicio": "http://127.0.0.1:10010/"
}
export var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'ip': '1_1_0_0'
    })
  };