import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { ArtistData } from "../data/artist-data";
import { AlbumData } from "../data/album-data";
import { TrackData } from "../data/track-data";
import { ResourceData } from "../data/resource-data";
import { ProfileData } from "../data/profile-data";

@Injectable({
  providedIn: "root",
})
export class SpotifyService {
  expressBaseUrl: string = "http://127.0.0.1:8888";

  constructor(private http: HttpClient) {}

  private sendRequestToExpress(endpoint: string): Promise<any> {
    // use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    const uri: string = `${this.expressBaseUrl}/${endpoint}`;

    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then(
      (response) => {
        return response;
      },
      (err) => {
        return err;
      },
    );
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data
    return this.sendRequestToExpress("me").then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    // identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    const endpoint: string = `search/${category}/${encodeURIComponent(resource)}`;

    return this.sendRequestToExpress(endpoint).then(
      (data: any): ResourceData[] => {
        switch (category) {
          case "artist":
            return data.artists.items.map(
              (artist: any): ArtistData => new ArtistData(artist),
            );

          case "album":
            return data.albums.items.map(
              (album: any): AlbumData => new AlbumData(album),
            );

          case "track":
            return data.tracks.items.map(
              (track: any): TrackData => new TrackData(track),
            );

          default:
            return [];
        }
      },
    );
  }

  getArtist(artistId: string): Promise<ArtistData> {
    // use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const endpoint: string = `artist/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then((data: any): ArtistData => {
      return new ArtistData(data);
    });
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    // use the top tracks endpoint to make a request to express.
    const endpoint: string = `artist-top-tracks/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then(
      (data: any): TrackData[] => {
        return data.tracks.map((track: any): TrackData => new TrackData(track));
      },
    );
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    // use the albums for an artist endpoint to make a request to express.
    const endpoint: string = `artist-albums/${encodeURIComponent(artistId)}`;

    return this.sendRequestToExpress(endpoint).then(
      (data: any): AlbumData[] => {
        return data.items.map((album: any): AlbumData => new AlbumData(album));
      },
    );
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    // use the album endpoint to make a request to express.
    const endpoint: string = `album/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then((data: any): AlbumData => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    // use the tracks for album endpoint to make a request to express.
    const endpoint: string = `album-tracks/${encodeURIComponent(albumId)}`;

    return this.sendRequestToExpress(endpoint).then(
      (data: any): TrackData[] => {
        return data.items.map((track: any): TrackData => new TrackData(track));
      },
    );
  }

  getTrack(trackId: string): Promise<TrackData> {
    // use the track endpoint to make a request to express.
    const endpoint: string = `track/${encodeURIComponent(trackId)}`;

    return this.sendRequestToExpress(endpoint).then((data: any): TrackData => {
      return new TrackData(data);
    });
  }
}
