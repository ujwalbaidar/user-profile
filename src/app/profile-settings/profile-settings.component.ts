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
  

  
  constructor(private profile: ProfileService) { }

  ngOnInit(): void {
    this.getuserProfile();
  }

  getuserProfile(){
 

  }
  saveProfile(){}

}
