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

  public displayLoad: Boolean = false;
  public displaySave: Boolean = false;
  public displayError: Boolean = false;
  public errorMessage: String = "";
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
  /** 
   * when save button is clicked, it displays save message
   * if save is successful remove save message and any error message that occured while saving
   * then update user data
   * if save is not success display error message and error occurance 
   * again try to update save new data**/
  saveProfile(){
    this.displaySave = true;
    if(this.user){
      this.profile.setName(this.user.firstName)
      .then(saveRes=>{
        this.displaySave = false;
        this.displayError = false;
        this.user  = JSON.parse(JSON.stringify(saveRes));
      })
      .catch(saveErr=>{
        this.displayError = true;
        this.errorMessage = saveErr.error;
        this.saveProfile();
      })
    }

  }

}
