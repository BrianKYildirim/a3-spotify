import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../services/spotify.service";
import { ProfileData } from "../../data/profile-data";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  standalone: false,
})
export class AboutComponent implements OnInit {
  name: string = null;
  profile_pic: string = "assets/unknown.jpg";
  profile_link: string = null;

  // inject the Spotify service
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {}

  // gets the "about me" information from Spotify when the button in the view is clicked. Update the name, profile_pic, and profile_link fields
  getAboutMe(): void {
    this.spotifyService.aboutMe().then((data: ProfileData) => {
      this.name = data.name;
      this.profile_pic = data.imageURL;
      this.profile_link = data.spotifyProfile;
    });
  }
}
