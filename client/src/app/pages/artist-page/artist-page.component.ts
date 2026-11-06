import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-artist-page",
  templateUrl: "./artist-page.component.html",
  styleUrls: ["./artist-page.component.css"],
  standalone: false,
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  topTracks: TrackData[];
  albums: AlbumData[];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");

    this.spotifyService.getArtist(this.artistId).then((data: ArtistData) => {
      this.artist = data;
    });

    this.spotifyService
      .getTopTracksForArtist(this.artistId)
      .then((data: TrackData[]) => {
        this.topTracks = data;
      });

    this.spotifyService
      .getAlbumsForArtist(this.artistId)
      .then((data: AlbumData[]) => {
        this.albums = data;
      });
  }
}
