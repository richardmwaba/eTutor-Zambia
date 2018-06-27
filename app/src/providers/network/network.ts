import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

/*
 Checks for network connectivity in the app
*/
export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {

  previousStatus;

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public eventCtrl: Events,
    public network: Network
  ) {
    console.log('Hello NetworkProvider Provider');
    // set default status
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
        if (this.previousStatus === ConnectionStatusEnum.Online) {
          this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
    });

    this.network.onConnect().subscribe(() => {
      // waits for 3s before coming online
      setTimeout(() => {
        if (this.previousStatus === ConnectionStatusEnum.Offline) {
          this.eventCtrl.publish('network:online');    
        }
        this.previousStatus = ConnectionStatusEnum.Online;
      }, 3000);
    });
  }

}
