import { HttpHeaders } from '@angular/common/http';
export var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'ip': '1_1_0_0'
    })
  };