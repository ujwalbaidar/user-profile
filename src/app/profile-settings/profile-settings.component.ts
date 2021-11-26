import { Component, OnInit } from '@angular/core';
import { IProfile, ProfileService } from '../profile-service/profile.service';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user: IProfile|undefined;
  
  public displayLoad = false;
  public displaySave = false;
  public displayError = false;

  constructor(private profile: ProfileService) { }
  /** 
   * call getUserProfile on initialization 
   * while data is not received display loading as true
   **/
  ngOnInit(): void {
    this.displayLoad = true;
    this.getuserProfile();
  }
  /** 
   * get user profile from profileService 
   * when data is fetched hide "display loading" message 
   * if error occurs reload the method "getuserProfile()"
   **/
  getuserProfile(){
    this.profile.getProfileUser()
      .then(userdata=>{
        this.displayLoad = false;
        this.user = userdata;
      })
      .catch(err=>{
        this.getuserProfile();
      })

  }
  saveProfile(){}

}
