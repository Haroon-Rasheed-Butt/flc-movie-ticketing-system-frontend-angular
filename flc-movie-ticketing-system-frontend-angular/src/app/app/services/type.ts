import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class typeService {
  private base = ${'$'}{environment.apiBaseUrl}/;
  constructor(private http: HttpClient) {}
  list() { return this.http.get(this.base); }
  get(id: number) { return this.http.get(${'$'}{this.base}/{id}); }
  create(body: any) { return this.http.post(this.base, body); }
  update(id: number, body: any) { return this.http.put(${'$'}{this.base}/{id}, body); }
  delete(id: number) { return this.http.delete(${'$'}{this.base}/{id}); }
}
