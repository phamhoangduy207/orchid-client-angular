import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { feed } from '../models/feed';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  //baseURL = 'https://orchid-server.herokuapp.com/api';
  baseURL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  feed: feed = new feed();

  getAllFeeds() {
    return this.http.get<feed[]>(this.baseURL + '/feeds');
  }

  addFeed() {
    return this.http.post(this.baseURL + '/feeds', this.feed);
  }

  update() {
    return this.http.put(
      `${this.baseURL + '/feeds'}/${this.feed.feed_id}`,
      this.feed
    );
  }

  deleteFeed(id: string) {
    return this.http.delete(`${this.baseURL + '/feeds'}/${id}`);
  }
}
