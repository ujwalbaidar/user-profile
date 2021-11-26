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
  public userCopy: IProfile|undefined;

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
        this.userCopy = JSON.parse(JSON.stringify(userdata));
      })
      .catch(err=>{
        this.getuserProfile();
      })

  }
  
  /** 
   * when save button is clicked, it displays save message
   * if save is successful call save email method
   *    then update user data
   * if save is not success display error message and error occurance 
   *    again try to update save new data**/

  saveProfile(){
    this.displaySave = true;
    
    if(this.user){
      this.profile.setName(this.user)
      .then(saveRes=>{
        this.saveEmail(saveRes);
      })
      .catch(saveErr=>{
        this.displayError = true;
        this.errorMessage = saveErr.error;
        this.saveProfile();
      })
    }
  }

  /**
   * get save response from saveProfile method
   * if save is successful hide error and save message display
   * update user data as well as copy for unsuccessful response for future calls
   * if save is not success display error message for generating email
   *    reload previous user data and set to user profile **/
  saveEmail(saveResp:any){
    this.profile.setUserEmail(saveResp)
      .then(finalRes=>{
        this.displaySave = false;
        this.displayError = false;
        this.user = JSON.parse(JSON.stringify(finalRes));
        this.userCopy = JSON.parse(JSON.stringify(finalRes));
      })
      .catch(finalErr=>{
        this.displayError = true;
        this.errorMessage = finalErr.error;
        this.displaySave = false;
        this.user = this.userCopy;
      })
  }

}
